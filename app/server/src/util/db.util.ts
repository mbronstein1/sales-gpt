import { Prisma, PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default {
  findMany: async (table: string, options?: any, prismaInstance?: PrismaClient) => {
    const prismaClient = prismaInstance || prisma;
    try {
      const result = await (prismaClient as any)[table].findMany(options || ({} as any));
      return result;
    } catch (error) {
      console.error('Error fetching records from the database: ', error);
      return [];
    }
  },
  findOne: async (table: string, options: any, prismaInstance?: PrismaClient) => {
    const prismaClient = prismaInstance || prisma;
    try {
      const result = await (prismaClient as any)[table].findUnique(options);
      return result;
    } catch (error) {
      console.error('Error fetching record from the database: ', error);
      return null;
    }
  },
  findFirst: async (table: string, options: any, prismaInstance?: PrismaClient) => {
    const prismaClient = prismaInstance || prisma;
    try {
      const result = await (prismaClient as any)[table].findFirst(options);
      return result;
    } catch (error) {
      console.error('Error fetching record from the database: ', error);
      return null;
    }
  },
  create: async (data: any, table: string, prismaInstance?: PrismaClient) => {
    const prismaClient = prismaInstance || prisma;
    try {
      const result = await (prismaClient as any)[table].create({ data });
      return result;
    } catch (error) {
      console.error('Error creating record in the database: ', error);
      return null;
    }
  },
  update: async (id: string, data: any, table: string, prismaInstance?: PrismaClient) => {
    const prismaClient = prismaInstance || prisma;
    try {
      const result = await (prismaClient as any)[table].update({ where: { id }, data });
      return result;
    } catch (error) {
      console.error('Error updating record in the database: ', error);
      return null;
    }
  },
  delete: async (id: string, table: string, prismaInstance?: PrismaClient) => {
    const prismaClient = prismaInstance || prisma;
    try {
      const result = await (prismaClient as any)[table].delete({ where: { id } });
      return result;
    } catch (error) {
      console.error('Error deleting record from the database: ', error);
      return null;
    }
  },
};
