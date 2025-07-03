const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/web_db2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB conectado!');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

module.exports = mongoose;
