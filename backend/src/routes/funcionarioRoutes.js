const express = require('express');
const { listarFuncionarios, criarFuncionario } = require('../controllers/funcionarioController');

const router = express.Router();

router.get('/', listarFuncionarios);
router.post('/', criarFuncionario);

module.exports = router;
