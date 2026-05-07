import { Request, Response } from "express";
import * as authService from "../services/auth.services";
import Logger from "../config/logger";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try{
        const result = await authService.login(email, password);
        res.status(200).json(result);
    } catch (error: any) {
        Logger.error(`Erro ao fazer login: ${error}`);
        // O erro 401 significa Unauthorized
        res.status(401).json({ error: error.message });
    }


};