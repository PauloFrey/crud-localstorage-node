const router = require('express').Router();

// Adiciona rota index
router.get('/', (req, res) => {
    res.render('Home/Index');
});

module.exports = router;