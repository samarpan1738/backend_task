//Getting clients
const express = require('express')
const app = express()
const path=require('path');

//B O D Y - P A R S E R S
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//Easily render pages with modified data
app.set('view engine', 'hbs')

//Send to api.js Router
app.use('/api',require('./routes/api').route)

//4 0 4 - H A N D L E R
app.use((req,res)=>
{
res.send(`
    <html>
    <body>
    <h2>404!Page Not Found</h2>
    </body>
    </html>
`);
});

app.listen(1738, () => {
    console.log("Server started at http://localhost:1738")
})