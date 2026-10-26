import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { PrismaClient } from '@/generated/prisma/client';

const connectionString = process.env.DATABASE_URL!;

const prismaClientSingleton = () => {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  const client = new PrismaClient({
    adapter,
    log: [{ emit: 'event', level: 'query' }],
  });

  if (process.env.NODE_ENV === 'development') {
    client.$on('query', (e) => {
      console.log(`[${e.duration}ms] ${e.query}`);
    });
  }

  return client;
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}
