const express = require('express');
const { listarCidades, criarCidade } = require('../controllers/cidadeController');

const router = express.Router();

router.get('/', listarCidades);
router.post('/', criarCidade);

module.exports = router;
