const express = require('express')
const router = express.Router()
const Job = require('../models/job')

router.get('/test', (req, res) => {
    res.send('deu certo')
})

router.get('/view/:id', (req, res) => Job.findOne({
    where: {id: req.params.id}  
}).then(job => {
    res.render('layouts/view', {
        job
    })
}).catch(err => console.log(err)))


router.get('/add', (req, res) => {
    res.render('layouts/add')
})


router.post('/add', (req, res) => {
 
    let {title, description, salary, company, email, new_job} = req.body 
2
  
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job,
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router