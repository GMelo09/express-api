import { prisma } from '../lib/prisma';

export const createCliente = async (
    nome: string,
    cpf: string,
    email: string
) => {
    const cliente = await prisma.cliente.create({
        data: { nome, cpf, email },
    });
    return cliente;
};

export const getAllClientes = async () => {
    return await prisma.cliente.findMany({
        select: {
            id_cliente: true,
            nome: true,
            cpf: true,
            email: true,
        },
    });
};

export const getClienteById = async (id_cliente: number) => {
    return await prisma.cliente.findUnique({
        where: { id_cliente },
        select: {
            id_cliente: true,
            nome: true,
            cpf: true,
            email: true,
        },
    });
};

export const updateCliente = async (
    id_cliente: number,
    data: { nome?: string; cpf?: string; email?: string }
) => {
    const cliente = await prisma.cliente.update({
        where: { id_cliente },
        data,
    });
    return cliente;
};

export const deleteCliente = async (id_cliente: number) => {
    return await prisma.cliente.delete({
        where: { id_cliente },
    });
};