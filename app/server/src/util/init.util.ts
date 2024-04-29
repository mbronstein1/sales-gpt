import db from './db.util';
import { hashPassword } from './auth.util';
import { prisma } from './db.util';

const initialUser = {
  email: 'admin@admin.com',
  password: 'password',
  first_name: 'GPT',
  last_name: 'Admin',
  isAdmin: true,
};

const initialCompany = {
  name: 'Sales Global',
  followupQs: [],
};

const initialCompanyContent = {
  category: 'Account First Call Research',
  data: [
    {
      title: 'Company Summary',
      prompt:
        'This section is called "Company Summary" and contain 2 sentences detailing what the company does.  Follow this with a directly URL to the company website',
      gridCoordinates: { x: 0, y: 0, w: 6, h: 2 },
      color: 'lightblue',
    },
    {
      title: 'Company Details',
      prompt: `This section is called \"Company Details\" and should have multiple bullet points covering\:
    1. Is the company Public or Private
    If public, include a link to their Financial Statements.
    If Private, who owns the company?
    2. Where is the head quarters?
    3. What industry are they in?
    4. How many customers do they have?
    `,
      gridCoordinates: { x: 0, y: 2, w: 6, h: 2 },
      color: 'lightgreen',
    },
    {
      title: 'Revenue',
      prompt: `This section is called \"Revenue\" and should have multiple bullet points covering\:
    1. What is the company's annual revenue?
    2. What are the different revenue streams and % of total revenue?
    `,
      gridCoordinates: { x: 0, y: 4, w: 6, h: 2 },
      color: 'lightyellow',
    },
    {
      title: 'Subsidiaries and Major Divisions',
      prompt: `This section is called \"Subsidiaries and Major Divisions\" and should have multiple bullet points covering\:
    What subsidiaries does this company have and or what are the major divisions of the company?
    `,
      gridCoordinates: { x: 0, y: 6, w: 6, h: 2 },
      color: 'lightpink',
    },
    {
      title: 'Spend and Supply Chain',
      prompt: `This section is called \"Spend and Supply Chain\" and should have multiple bullet points covering\:
    1. How much does the company spend annually?
    2. What type of direct spend does the company require?
    3. What are the spend categories?
    4. Where does this company fit in the supply chain?
    5. What suppliers and subcontractos does this company use?
    6. Tell me about the companies upstream and downstream in the supply chain for this industry.
    `,
      gridCoordinates: { x: 0, y: 8, w: 6, h: 2 },
      color: 'lightpurple',
    },
    {
      title: 'Growth Strategy',
      prompt: `This section is called \"Growth Strategy\" and should contain a bullet points listing the company's top 5 strategic priorities`,
      gridCoordinates: { x: 0, y: 10, w: 6, h: 2 },
      color: 'lightgrey',
    },
    {
      title: 'Partners',
      prompt: `This section is called \"Partners\" and should answer the question, Does this company partner with other companies and if so who?`,
      gridCoordinates: { x: 0, y: 12, w: 6, h: 2 },
      color: 'lightcoral',
    },
    {
      title: 'Contract Management',
      prompt: `This section is called \"Contract Management\" and should contain no more than 5 sentences giving examples of where contract management could help with upcoming head and tail winds in their industry`,
      gridCoordinates: { x: 0, y: 14, w: 6, h: 2 },
      color: 'lightcyan',
    },
    {
      title: 'Key Clauses',
      prompt: `This section is called \"Key Clauses\" and should answer the following questions\:
    1. What contractual clauses are unique to this company?
    2. What clauses cuase the most amount of risk and obligations?
    `,
      gridCoordinates: { x: 0, y: 16, w: 6, h: 2 },
      color: 'lightgoldenrodyellow',
    },
    {
      title: 'Titles to Reach Out To',
      prompt: `This section is called \"Titles to Reach Out To\" and should be a bullet list of the titles that would want to learn about contract management.  
    No more than 10.  These titles should not include C level of heads of departments.  Make sure the titles are specific to the industry.
    For example, don’t just put procurement, but the category spend buyer as an example.
    `,
      gridCoordinates: { x: 0, y: 18, w: 6, h: 2 },
      color: 'lightseagreen',
    },
  ],
};

const initializeDB = async () => {
  try {
    const [user, company] = await Promise.all([
      db.findOne('email', initialUser.email, 'user'),
      db.findOne('name', initialCompany.name, 'company'),
    ]);

    if (user || company) {
      console.log('User or company already exists');
      return;
    }

    const result = await prisma.$transaction(async (transactionPrisma: any) => {
      const [company, content] = await Promise.all([
        db.create(initialCompany, 'company', transactionPrisma),
        db.create({ ...initialCompanyContent, isShared: true }, 'content', transactionPrisma),
      ]);

      if (!company) throw new Error('Error creating company');
      if (!content) throw new Error('Error creating content');

      const companyContentData = {
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
      };

      // Create company content
      const companyContent = await db.create(
        companyContentData,
        'companyContent',
        transactionPrisma
      );

      if (!companyContent) throw new Error('Error creating company content');

      // Hash password and create user
      const hashedPassword = hashPassword(initialUser.password);
      const userData = {
        ...initialUser,
        password: hashedPassword,
        company: {
          connect: {
            id: company.id,
          },
        },
      };

      const user = await db.create(userData, 'user', transactionPrisma);

      if (!user) throw new Error('Error creating user');

      return user;
    });

    console.log('User and company created successfully', result);
  } catch (error) {
    console.error('Error initializing DB:', error);
  }
};

if (require.main === module) {
  initializeDB();
}
