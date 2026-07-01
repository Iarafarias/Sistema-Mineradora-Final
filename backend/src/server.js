const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const equipamentoRoutes = require('./routes/equipamentoRoutes');
const cidadeRoutes = require('./routes/cidadeRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const servicoRoutes = require('./routes/servicoRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/equipamentos', equipamentoRoutes);
app.use('/cidades', cidadeRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/servicos', servicoRoutes);

app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});
