import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient}

export const prisma = 
    globalForPrisma.prisma || 
    new PrismaClient({
        log: ["query"],
        // Your own configuration here
    });
if(process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma