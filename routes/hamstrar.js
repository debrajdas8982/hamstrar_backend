const db = require('../database.js')


const express = require('express')
const router = express.Router()


router.get('/', (req, res)=>{
	console.log('/hamstrar REST API')
	res.send('/hamstrar REST API')
})

module.exports = router;
