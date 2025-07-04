const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

    jwt.verify(token, 'seusegredo', (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido.' });
        req.user = decoded; 
        next();
    });
};

exports.isMedico = (req, res, next) => {
    if (req.user.role === 'medico') {
        next();
    } else {
        return res.status(403).json({ message: 'Acesso restrito a médicos.' });
    }
};
