const express = require('express');
const { listarServicos, criarServico } = require('../controllers/servicoController');

const router = express.Router();

router.get('/', listarServicos);
router.post('/', criarServico);

module.exports = router;
