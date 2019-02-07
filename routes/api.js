const route=require('express').Router()
const db=require('../db')

//Send all person's info as array
route.get('/getAllPersons/',(req,res)=>
{
    db.getAllPersons().then((persons)=>res.send(persons)).catch((err)=>res.send({error:err}))
})

//GET Particular Person's data 
route.get('/getPerson/',(req,res)=>
{
    db.getPersonById(req.query.id).then((person)=>res.send(person)).catch((err)=>{console.log("id method catch");res.send({error:err})})
})

//Search on basis of specified string
route.get('/searchByCollegeName/',(req,res)=>
{
    db.searchByCollegeName(req.query.key).then((person)=>res.send(person)).catch((error)=>res.send({error}))
})


//DELETE person by ID
route.delete('/deleteById/',(req,res)=>
{
    db.deletePersonById(req.query.id).then(()=>res.redirect('/api/persons/')).catch((err)=>res.send({error:err}))
})

//Adds new person.info is in res.body
route.post('/addperson/',(req,res)=>
{
    db.addNewPerson(req.body.name,req.body.age,req.body.city,req.body.college).then(()=>res.redirect('/api/persons/')).catch((err)=>res.send({error:err}))
})

//4 0 4 - H A N D L E R

route.use((req,res)=>
{
res.send(
    {
        message:"No such endpoint."
    }
);
});

module.exports={route}