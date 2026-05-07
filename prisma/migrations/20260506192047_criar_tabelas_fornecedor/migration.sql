-- CreateTable
CREATE TABLE "Fornecedor" (
    "idFornecedor" SERIAL NOT NULL,
    "nomeFornecedor" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "email" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("idFornecedor")
);

-- CreateTable
CREATE TABLE "TelefoneFornecedor" (
    "idTelefone" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "fornecedorId" INTEGER NOT NULL,

    CONSTRAINT "TelefoneFornecedor_pkey" PRIMARY KEY ("idTelefone")
);

-- CreateTable
CREATE TABLE "EnderecoFornecedor" (
    "idEndereco" SERIAL NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "fornecedorId" INTEGER NOT NULL,

    CONSTRAINT "EnderecoFornecedor_pkey" PRIMARY KEY ("idEndereco")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_documento_key" ON "Fornecedor"("documento");

-- AddForeignKey
ALTER TABLE "TelefoneFornecedor" ADD CONSTRAINT "TelefoneFornecedor_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("idFornecedor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnderecoFornecedor" ADD CONSTRAINT "EnderecoFornecedor_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("idFornecedor") ON DELETE RESTRICT ON UPDATE CASCADE;
