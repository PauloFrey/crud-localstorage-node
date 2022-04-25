const router = require('express').Router();
const fs = require('fs');
const {join} = require('path');
var ejs = require('ejs');

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
    res.render('Home/index',{
        contas: contas
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
router.put('/contas/edit/:id',async(req,res) => {
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