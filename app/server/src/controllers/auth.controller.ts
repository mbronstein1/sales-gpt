import { Request, Response } from 'express';
import db, { prisma } from '../util/db.util';
import { checkPassword, signToken, hashPassword } from '../util/auth.util';
import { signupAdminSchema } from '../util/validator.util';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await db.findOne('user', { where: { email } });

  console.log('base url', req.baseUrl);
  console.log('original url', req.originalUrl);
  console.log('url', req.url);
  console.log('path', req.path);

  if (!user) {
    return res.status(404).send('User not found');
  }

  const isValid = checkPassword(password, user.password);

  if (!isValid) {
    return res.status(401).send('Invalid credentials');
  }

  const token = signToken(user);

  res.send(token);
};

export const signupAdmin = async (req: Request, res: Response) => {
  try {
    await signupAdminSchema.validate(req.body);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }

  const { email, password } = req.body;
  const { companyName } = req.params;
  const [userExists, companyExists, content] = await Promise.all([
    db.findOne('user', { where: { email } }),
    db.findOne('company', { where: { name: companyName } }),
    db.findFirst('content', { where: { isShared: true } }),
  ]);

  if (userExists) {
    return res.status(400).send('User already exists');
  }

  if (companyExists) {
    return res.status(400).send('Company already exists');
  }

  try {
    const result = await prisma.$transaction(async (prisma: any) => {
      // Create company

      const company = await db.create({ name: companyName }, 'company');
      if (!company) throw new Error('Error creating company');

      // Create company content
      const companyContentLink = await db.create(
        {
          company: {
            connect: {
              id: company.id,
            },
          },
          content: {
            connect: {
              id: content.id,
            },
          },
        },
        'companyContent',
        prisma
      );

      if (!companyContentLink) throw new Error('Error creating company content');

      // Hash password and create user
      const hashedPassword = hashPassword(password);
      const user = await db.create(
        {
          ...req.body,
          password: hashedPassword,
          isAdmin: true,
          company: {
            connect: {
              id: company.id,
            },
          },
        },
        'user',
        prisma
      );

      if (!user) throw new Error('Error creating user');

      return user;
    });

    const token = signToken(result);
    res.send(token);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};
