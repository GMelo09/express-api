import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';



export const login = async (email: string, password: string) => {

    // 1: Procurar o usuário pelo e-mail
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    // 2: Verificar se a senha está correta
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    // 3: Gerar um token JWT
    const token = jwt.sign(
     {id : user.id, email: user.email},
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
    );
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };


}