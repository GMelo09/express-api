-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id_cliente" SERIAL NOT NULL,
    "nome" TEXT,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
