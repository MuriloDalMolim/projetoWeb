const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();

require('./config/mongo');

// Middleware
app.use(bodyParser.json());

// Importar Rotas
const medicoRoutes = require('./routers/medicoRoutes');
const pacienteRoutes = require('./routers/pacienteRoutes');
const convenioRoutes = require('./routers/convenioRoutes');
const consultaRoutes = require('./routers/consultaRoutes');
const pacienteConvenioRoutes = require('./routers/pacienteConvenioRoutes');
const prontuarioRoutes = require('./routers/prontuarioRoutes');
const authRoutes = require('./routers/authRoutes');

app.use('/api/paciente_convenios', pacienteConvenioRoutes);
app.use('/api/medicos', medicoRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/convenios', convenioRoutes);
app.use('/api/consultas', consultaRoutes);
app.use('/api/prontuarios', prontuarioRoutes);
app.use('/api/auth', authRoutes);

db.sequelize.sync().then(() => {
    console.log('Banco conectado com sucesso!');
    app.listen(3000, () => 
        console.log(`Servidor rodando na porta 3000`));
}).catch(err => 
    console.error('Erro ao conectar no banco:', err));
