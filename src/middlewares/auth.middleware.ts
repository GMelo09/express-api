import { Request, Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import Logger from "../config/logger";


// Vamos criar um interface para o TypeScript saber que o request
//agora poder ter um userId

export interface AuthRequest extends Request {
    userId?: number;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }

    //Separa o "Bearer" do token
    const [, token] = authHeader.split(' ');

    try{

        //tentar decodificar o token usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id: number}; // Como o token foi criado com o id, vamos tipar o decoded para ter o id   

        // Anota o ID do usuário na request
        req.userId = decoded.id;
        return next(); // aqui deu tudo certo a requisição vai para o controller

    } catch (error) {
        Logger.error(`Token de autenticação inválido: ${error}`);
        return res.status(401).json({ error: 'Token de autenticação inválido' });
    }
   


}