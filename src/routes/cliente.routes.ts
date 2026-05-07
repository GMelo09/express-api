import { Router } from 'express';
import { create, list, getById, update, remove } from '../controllers/cliente.controller';
import { validate } from '../middlewares/validate.middlewares';
import { createClienteSchema, updateClienteSchema } from '../schemas/cliente.schemas';

const router = Router();

router.post('/', validate(createClienteSchema), create);   // POST   /clientes
router.get('/', list);                                     // GET    /clientes
router.get('/:id', getById);                               // GET    /clientes/:id
router.put('/:id', validate(updateClienteSchema), update); // PUT    /clientes/:id
router.delete('/:id', remove);                             // DELETE /clientes/:id

export default router;