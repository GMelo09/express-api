import { Request, Response } from "express";
import * as userService from "../services/user.services";
import Logger from "../config/logger";

export const create = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try{
        const user = await userService.createUser(name, email, password);
        Logger.info(`Usuário ${user.name} criado com sucesso!`);
        res.status(201).json(user);
    
    } catch (error) {
        Logger.error(`Erro ao criar usuário: ${error}`);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

export const list = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        Logger.error(`Erro ao listar usuários: ${error}`);
        res.status(500).json({ error: 'Erro ao listar usuários' });
    }
};

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const user = await userService.updateUser(Number(id), { name, email });
        res.status(200).json(user);
    } catch (error) {
        Logger.error(`Erro ao atualizar usuário: ${error}`);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await userService.deleteUser(Number(id));
        res.status(200).json({ message: 'Usuário removido com sucesso!' });
    } catch (error) {
        Logger.error(`Erro ao remover usuário: ${error}`);
        res.status(500).json({ error: 'Erro ao remover usuário' });
    }
};

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await userService.getUserById(Number(id));
        res.status(200).json(user);
    } catch (error) {
        Logger.error(`Erro ao buscar usuário por ID: ${error}`);
        res.status(500).json({ error: 'Erro ao buscar usuário por ID' });
    }
};