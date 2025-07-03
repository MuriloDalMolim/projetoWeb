const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();

// Middleware
app.use(bodyParser.json());

app.use('/api/paciente_convenios', require('./routers/pacienteConvenioRoutes'));

// Importar Rotas
const medicoRoutes = require('./routers/medicoRoutes');
const pacienteRoutes = require('./routers/pacienteRoutes');
const convenioRoutes = require('./routers/convenioRoutes');
const consultaRoutes = require('./routers/consultaRoutes');
const authRoutes = require('./routers/authRoutes');

app.use('/api/medicos', medicoRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/convenios', convenioRoutes);
app.use('/api/consultas', consultaRoutes);
app.use('/api/auth', authRoutes);


const PORT = 3000;

db.sequelize.sync().then(() => {
    console.log('Banco conectado com sucesso!');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}).catch(err => console.error('Erro ao conectar no banco:', err));
