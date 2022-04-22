const router = require('express').Router();
const fs = require('fs');
const {join} = require('path');

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

const saveConta = (contas) => fs.writeFileSync(filePath, JSON.stringify(contas, null, '\t'))

const userRoute = (app) => {
    app.route('/contas/:id?')
        .get((req,res) =>{ //GET Index
            const contas = getContas()

            res.send({ contas });
        }) //CREATE Contas
        .post((req,res) => {
            const contas = getContas();

            contas.push(req.body);
            saveConta(contas);

            res.status(201).send('OK')
        })
}

module.exports = userRoute;