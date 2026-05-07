import { Request, Response } from 'express';
import * as fornecedorService from '../services/fornecedor.services';
import Logger from '../config/logger';

export const criarFornecedor = async (req: Request, res: Response) => {
    const { nomeFornecedor, documento, email, telefones, enderecos } = req.body;

    if (!nomeFornecedor || !documento) {
        return res.status(400).json({ error: 'nomeFornecedor e documento são obrigatórios.' });
    }

    try {
        const fornecedor = await fornecedorService.criarFornecedor({
            nomeFornecedor,
            documento,
            email,
            telefones,
            enderecos,
        });
        Logger.info(`Fornecedor ${fornecedor.nomeFornecedor} criado com sucesso!`);
        return res.status(201).json(fornecedor);
    } catch (error: any) {
        Logger.error(`Erro ao criar fornecedor: ${error}`);
        if (error?.code === 'P2002') {
            return res.status(400).json({ error: 'Já existe um fornecedor com este documento.' });
        }
        return res.status(500).json({ error: 'Erro interno ao criar fornecedor.' });
    }
};

export const listarFornecedores = async (req: Request, res: Response) => {
    try {
        const fornecedores = await fornecedorService.listarFornecedores();
        return res.status(200).json(fornecedores);
    } catch (error) {
        Logger.error(`Erro ao listar fornecedores: ${error}`);
        return res.status(500).json({ error: 'Erro interno ao listar fornecedores.' });
    }
};

export const buscarFornecedorPorId = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const fornecedor = await fornecedorService.buscarFornecedorPorId(Number(id));

        if (!fornecedor) {
            return res.status(404).json({ error: 'Fornecedor não encontrado.' });
        }

        return res.status(200).json(fornecedor);
    } catch (error) {
        Logger.error(`Erro ao buscar fornecedor por ID: ${error}`);
        return res.status(500).json({ error: 'Erro interno ao buscar fornecedor.' });
    }
};

export const atualizarFornecedor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nomeFornecedor, documento, email, ativo } = req.body;

    try {
        const fornecedor = await fornecedorService.atualizarFornecedor(Number(id), {
            nomeFornecedor,
            documento,
            email,
            ativo,
        });
        return res.status(200).json(fornecedor);
    } catch (error: any) {
        Logger.error(`Erro ao atualizar fornecedor: ${error}`);
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: 'Fornecedor não encontrado.' });
        }
        return res.status(500).json({ error: 'Erro interno ao atualizar fornecedor.' });
    }
};

export const excluirFornecedor = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await fornecedorService.excluirFornecedor(Number(id));
        return res.status(200).json({ message: 'Fornecedor excluído com sucesso!' });
    } catch (error: any) {
        Logger.error(`Erro ao excluir fornecedor: ${error}`);
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: 'Fornecedor não encontrado.' });
        }
        return res.status(500).json({ error: 'Erro interno ao excluir fornecedor.' });
    }
};