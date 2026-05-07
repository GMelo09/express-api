import { z } from 'zod';

export const createClienteSchema = z.object({
    body: z.object({
        nome: z
            .string({ required_error: 'O campo "nome" é obrigatório' })
            .min(3, { message: 'O campo "nome" deve conter pelo menos 3 caracteres' })
            .max(100, { message: 'O campo "nome" deve conter no máximo 100 caracteres' }),

        cpf: z
            .string({ required_error: 'O campo "cpf" é obrigatório' })
            .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
                message: 'O campo "cpf" deve estar no formato 000.000.000-00',
            }),

        email: z
            .string({ required_error: 'O campo "email" é obrigatório' })
            .email({ message: 'O campo "email" deve ser um e-mail válido' })
            .max(100, { message: 'O campo "email" deve conter no máximo 100 caracteres' }),
    }),
});

export const updateClienteSchema = z.object({
    body: z.object({
        nome: z
            .string()
            .min(3, 'O nome deve ter no mínimo 3 caracteres')
            .max(100, 'O nome deve ter no máximo 100 caracteres')
            .optional(),

        cpf: z
            .string()
            .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
                message: 'O campo "cpf" deve estar no formato 000.000.000-00',
            })
            .optional(),

        email: z
            .string()
            .email('O e-mail deve ser válido')
            .max(100, 'O e-mail deve ter no máximo 100 caracteres')
            .optional(),
    }),
});