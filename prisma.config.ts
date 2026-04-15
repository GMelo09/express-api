import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma', // Caminho para o seu schema
  datasource: {
    url: process.env.DATABASE_URL,
  },
});