const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load('./config/swagger.yaml');

require('./config/mongo');

app.use(cors());

// Middleware
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Importar Rotas
const medicoRoutes = require('./routers/medicoRoutes');
const pacienteRoutes = require('./routers/pacienteRoutes');
const convenioRoutes = require('./routers/convenioRoutes');
const consultaRoutes = require('./routers/consultaRoutes');
const pacienteConvenioRoutes = require('./routers/pacienteConvenioRoutes');
const prontuarioRoutes = require('./routers/prontuarioRoutes');
const authRoutes = require('./routers/authRoutes');

app.use('/api/pacienteconvenios', pacienteConvenioRoutes);
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
    app.listen(3000, () => {
    console.log(`Swagger disponível em: http://localhost:3000/api-docs`);
});
}).catch(err => 
    console.error('Erro ao conectar no banco:', err));
