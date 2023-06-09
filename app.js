'use strict'
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
const db = require('./db/connection')
const bodyParser = require('body-parser')
const Job = require('./models/job')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const PORT = 3000

app.listen(PORT, function(){
    console.log(`O Express está rodando na porta ${PORT}`)
})

app.use(bodyParser.urlencoded({extended: false}))

app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))

db.authenticate().then(() => {
    console.log("Conectou ao banco com sucesso")
 })
 .catch(err => {
    console.log("Ocorreu um erro ao conectar", err)
 })
 
 app.get('/', (req, res) => {

    let search = req.query.job
    let query = '%'+search+'%'

    if(!search){

        Job.findAll({order:[
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {

            res.render('layouts/index', {
                jobs
            })
        })
        .catch(err => console.log(err))
    } else {
        Job.findAll({
            where: {title: {[Op.like]: query}},
            order: [
             ['createdAt', 'DESC']
        ]})
        .then(jobs => {

            res.render('layouts/index', {
                jobs, search
            })
        })
        .catch(err => console.log(err))
    }
 }) 

app.use('/jobs', require('./routes/jobs'))
