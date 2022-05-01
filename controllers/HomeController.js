const router = require('express').Router();
const fs = require('fs');
const {join} = require('path');
var ejs = require('ejs');
const localStorage = require('localStorage');

const filePath = join(process.cwd(),'/src/Contas.json');

const getContas = () => {
    try {
        return JSON.parse(localStorage.getItem('contas')) ?? []
        
    } catch (error) {
        return []
    }
}
const saveConta = (contas) => localStorage.setItem('contas', JSON.stringify(contas, null, '\t'))

//INDEX
router.get('/contas',(req,res) =>{ 
    const contas = getContas()
    let entrada = 0;
    let saida = 0;
    let diferenca = 0;
    for(var i = 0; i < contas.length; i++){
        if(contas[i].status == 'E'){
            entrada += parseInt(contas[i].valor);
        }else{
            saida += parseInt(contas[i].valor);
        }
        diferenca = parseInt(entrada - saida);
    }
    console.log(contas)
    res.render('Home/index',{
        contas: contas,
        entrada: entrada,
        saida: saida,
        diferenca: diferenca
    })
})

//CREATE get
router.get('/contas/create',(req,res) => {
    res.render('Home/create')
})
//CREATE post
router.post('/contas/create',async(req,res) => {
    const contas = getContas();
    contas.push(req.body);

    saveConta(contas);

    res.redirect('/contas')
})

//EDIT get
router.get('/contas/edit/:id',(req,res) => {
    const contas = getContas();

    var conta = contas.filter(contas => {
        if(contas.id === req.params.id){
            return{
                ...contas
            }
        }
    });
    res.render('Home/edit',{
        conta: conta
    })
})
//EDIT put
router.post('/contas/edit/:id',async(req,res) => {
    const contas = getContas();

    saveConta(contas.map(contas =>{
        if(contas.id === req.params.id){
            return{
                ...contas,
                ...req.body
            }
        }
    }));

    res.redirect('/contas')
})

//DELETE Delete
router.delete('/contas/delete/:id',async(req,res) => {
    const contas = getContas();

    saveConta(contas.filter(contas => contas.id !== req.params.id))

    res.status(200).send('Delete');
})

module.exports = router;