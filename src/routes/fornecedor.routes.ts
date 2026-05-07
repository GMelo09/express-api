import { Router } from 'express';
import {
    criarFornecedor,
    listarFornecedores,
    buscarFornecedorPorId,
    atualizarFornecedor,
    excluirFornecedor,
} from '../controllers/fornecedor.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/fornecedor', authenticate, criarFornecedor);
router.get('/fornecedor', authenticate, listarFornecedores);
router.get('/fornecedor/:id', authenticate, buscarFornecedorPorId);
router.put('/fornecedor/:id', authenticate, atualizarFornecedor);
router.delete('/fornecedor/:id', authenticate, excluirFornecedor);

export default router;