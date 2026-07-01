const express = require('express');
const { listarEquipamentos, criarEquipamento } = require('../controllers/equipamentoController');

const router = express.Router();

router.get('/', listarEquipamentos);
router.post('/', criarEquipamento);

module.exports = router;
