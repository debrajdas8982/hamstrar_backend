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

//GET // ID

router.get('/:id', async (req, res) => {
	const id = req.params.id
	const docRef = await db.collection('hamstrar').doc(id).get()

	if( !docRef.exists) {
		res.status(404).send('Specific Hamstrar doesnot exists')
		return
	}
	const data = docRef.data()
	res.send(data)
})

//POST /hamstrar

router.post('/', async (req, res)=>{
	const object = req.body

	if (!isToolsObject(object)) {
		res.status(400).send("Bad request")
		return
	}
	const docRef = await db.collection('hamstrar').add(object)
	console.log('The document id is: ' + docRef.id)
	res.status(200).send(docRef.id)

})

function isToolsObject(maybeObject) {

	if( !maybeObject )
		return false
	else if( !maybeObject.name || !maybeObject.age || !maybeObject.defeats || !maybeObject.favFood || !maybeObject.games|| !maybeObject.loves || maybeObject.wins)

		return false

	return true
}

//PUT
router.put('/:id', async (req, res) => {

	const object = req.body
	const id = req.params.id

	console.log('console log 1', object);
	console.log('console log 1.2', id);

	if( !object || !id ) {
		res.sendStatus(400)
		return
	}

	const docRef = db.collection('hamstrar').doc(id)
	await docRef.set(object, { merge: true })
	res.sendStatus(200)
})

//DELETE

router.delete('/:id', async (req, res) => {
	const id = req.params.id

	if( !id ) {
		res.sendStatus(400)
		return
	}

	await db.collection('hamstrar').doc(id).delete()
	res.sendStatus(200)
})

//RANDOM hamstrar

router.get('/random', async (req, res) => {

	const docRef = db.collection('hamstrar');
	const snapshot = await docRef.get();


	if (snapshot.empty) {
		res.send([])
		return
	}
	items = []

	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		// res.send(data)
		items.push(data)
	})

	const rndIndex = Math.floor(Math.random() * items.length)
	res.status(200).send(items[rndIndex])

})



module.exports = router;
