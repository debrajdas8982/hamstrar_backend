const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamstrar = require('./routes/hamstrar.js')

const PORT = 1351
const staticFolder = path.join(__dirname, 'static')
// const imgFolder = path.join(__dirname, 'img')



app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url} `, req.params);
	next()
})

app.use( express.json() )
app.use( cors() )
app.use( express.static(staticFolder) )
// app.use(express.static(imgFolder))



// Routes

// REST API
app.use('/hamstrar' , hamstrar)

app.get('/', (req,res)=>{
	res.send('firebase project on Hamstrar')
})



// Starta servern
app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
})
