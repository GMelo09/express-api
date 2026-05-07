import { Router } from "express";
import {create, list, update, remove, getById} from '../controllers/user.controller'; 
import { validate } from '../middlewares/validate.middlewares';
import { createUserSchema, updateUserSchema } from '../schemas/user.schemas';
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();



// Forma 1 rota sem validador Zod
//Permitido Senhas fracas, email sem @, campos vazios etc...


// router.post('/', create);
// router.get('/', list);
// router.put('/:id', update);
// router.delete('/:id', remove);
// router.get('/:id', getById);

// Forma 2 rota com validador Zod
// router.post('/', validate(createUserSchema), create); // <-- validação para criação de novos users
// router.get('/', list);
// router.put('/:id', validate(updateUserSchema), update); // <-- validação para atualização de users
// router.get('/:id', getById);


// Forma 3 rota protegida com JWT
// A criação de usuários continurá desprotegida ou 
// qualquer um podera criar uma conta mesmo sem logar
router.post ('/', validate(createUserSchema), create); // <-- validação para criação de novos users

router.get('/', authenticate, list);
router.get('/:id', authenticate, getById);
router.put('/:id', authenticate, validate(updateUserSchema), update); // <-- validação para atualização de users
router.delete('/:id', authenticate, remove);



export default router;
