import { prisma } from '../lib/prisma';

export const criarFornecedor = async (data: {
    nomeFornecedor: string;
    documento: string;
    email?: string;
    telefones?: { numero: string }[];
    enderecos?: {
        logradouro: string;
        numero?: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
    }[];
}) => {
    const { telefones, enderecos, ...fornecedorData } = data;

    return await prisma.fornecedor.create({
        data: {
            ...fornecedorData,
            telefones: telefones ? { create: telefones } : undefined,
            enderecos: enderecos ? { create: enderecos } : undefined,
        },
        include: {
            telefones: true,
            enderecos: true,
        },
    });
};

export const listarFornecedores = async () => {
    return await prisma.fornecedor.findMany({
        include: {
            telefones: true,
            enderecos: true,
        },
    });
};

export const buscarFornecedorPorId = async (idFornecedor: number) => {
    return await prisma.fornecedor.findUnique({
        where: { idFornecedor },
        include: {
            telefones: true,
            enderecos: true,
        },
    });
};

export const atualizarFornecedor = async (
    idFornecedor: number,
    data: {
        nomeFornecedor?: string;
        documento?: string;
        email?: string;
        ativo?: boolean;
    }
) => {
    return await prisma.fornecedor.update({
        where: { idFornecedor },
        data,
        include: {
            telefones: true,
            enderecos: true,
        },
    });
};

export const excluirFornecedor = async (idFornecedor: number) => {
    // Remove relacionamentos primeiro para respeitar as foreign keys
    await prisma.telefoneFornecedor.deleteMany({ where: { fornecedorId: idFornecedor } });
    await prisma.enderecoFornecedor.deleteMany({ where: { fornecedorId: idFornecedor } });
    return await prisma.fornecedor.delete({ where: { idFornecedor } });
};