import { Request, Response } from 'express';
import * as clienteService from '../services/cliente.services';
import Logger from '../config/logger';

export const create = async (req: Request, res: Response) => {
    const { nome, cpf, email } = req.body;

    try {
        const cliente = await clienteService.createCliente(nome, cpf, email);
        Logger.info(`Cliente ${cliente.nome} criado com sucesso!`);
        res.status(201).json(cliente);
    } catch (error) {
        Logger.error(`Erro ao criar cliente: ${error}`);
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
};

export const list = async (req: Request, res: Response) => {
    try {
        const clientes = await clienteService.getAllClientes();
        res.status(200).json(clientes);
    } catch (error) {
        Logger.error(`Erro ao listar clientes: ${error}`);
        res.status(500).json({ error: 'Erro ao listar clientes' });
    }
};

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const cliente = await clienteService.getClienteById(Number(id));

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        res.status(200).json(cliente);
    } catch (error) {
        Logger.error(`Erro ao buscar cliente por ID: ${error}`);
        res.status(500).json({ error: 'Erro ao buscar cliente por ID' });
    }
};

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, cpf, email } = req.body;

    try {
        const cliente = await clienteService.updateCliente(Number(id), {
            nome,
            cpf,
            email,
        });
        res.status(200).json(cliente);
    } catch (error) {
        Logger.error(`Erro ao atualizar cliente: ${error}`);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
};

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await clienteService.deleteCliente(Number(id));
        res.status(200).json({ message: 'Cliente removido com sucesso!' });
    } catch (error) {
        Logger.error(`Erro ao remover cliente: ${error}`);
        res.status(500).json({ error: 'Erro ao remover cliente' });
    }
};