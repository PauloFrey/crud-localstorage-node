const router = require('express').Router();
const fs = require('fs');
const {join} = require('path');
var ejs = require('ejs');
const localStorage = require('localStorage');

const filePath = join(process.cwd(),'/src/Contas.json');

const getContas = () => {
    const data = fs.existsSync(filePath)
        ? fs.readFileSync(filePath)
        : []

        try {
            return JSON.parse(data )
        } catch (error) {
            return []
        }
}
const saveConta = (contas) => {
    let data = JSON.stringify(contas,null,'\t');
    fs.writeFileSync(filePath,data)
}

//INDEX
router.get('/contas',async(req,res) =>{ 
    const contas = await getContas()
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
    console.log(conta[0].id)
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
    console.log(req.body)
    res.redirect('/contas')
})

//DELETE Delete
router.delete('/contas/delete/:id',async(req,res) => {
    const contas = getContas();

    saveConta(contas.filter(contas => contas.id !== req.params.id))

    res.status(200).send('Delete');
})

module.exports = router;