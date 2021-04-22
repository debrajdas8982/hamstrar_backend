const db = require('../database.js')


const express = require('express')
const router = express.Router()

//GET hamstrar
router.get('/', async (req, res)=>{
	// console.log('/hamstrar REST API')
	// res.send('/hamstrar REST API')

	const hamstrarRef = db.collection('hamstrar')
	const snapshot = await hamstrarRef.get()

	if(snapshot.empty){
		res.send([])
		return
	}
	let items = []
	snapshot.forEach(doc=>{
		const data = doc.data()
		// data.id = doc.id
		items.push(data)
	})
	res.send(items)
})



module.exports = router;
