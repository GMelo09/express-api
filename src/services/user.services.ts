import bcrypt from 'bcrypt';
import {prisma } from '../lib/prisma';

export const createUser = async (name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
    
}

export const getAllUsers = async () => {
 return await prisma.user.findMany({
    select: {
        id: true,
        name: true,
        email: true,
    },
 });
   
}


export const getUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
}

export const updateUser = async (id: number, data:{name?: string; email?: string})  => {
   const updateUser = await prisma.user.update({
       where: {
           id,
       },
       data // passando o objeto data diretamente
   });

   // remover a senha antes de retornar
   const { password: _, ...userWithoutPassword } = updateUser;
   return userWithoutPassword;
   
};

export const deleteUser = async (id: number) => {
    return await prisma.user.delete({
        where: {
            id,
        },
    });
}