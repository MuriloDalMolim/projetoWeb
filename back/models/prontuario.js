const mongoose = require('mongoose');

const ConsultaSchema = new mongoose.Schema({
    id_consulta: String,
    data: String,
    sintomas: String,
    diagnostico: String,
    prescricao: String,
    observacoes: String
});

const ProntuarioSchema = new mongoose.Schema({
    id_paciente: String,
    historico: [ConsultaSchema]
},{
    versionKey: false
});

module.exports = mongoose.model('Prontuario', ProntuarioSchema);
