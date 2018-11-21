const bodyParser = require('body-parser')
const express = require('express')
const slowDown = require('express-slow-down')

const dev = true

const app = express()
const port = 3333

const flag = 'My super secret passcode:\nflag{-_-______----__-_-__--___-_}'
const passcode = 'JFtMf1T2pv2nGVc87jp9WSjSj6A3vJ70'
const users = ['admin', 'john', 'marie', 'jack', 'howard', 'matt', 'jane', 'fred', 'nicolas', 'rasmus']

const messages = [
	{from: 'me', to: 'admin', text: 'Hey admin!'},
	{from: 'admin', to: 'me', text: 'Hello, how can i be of a help?'},
	{from: 'me', to: 'admin', text: 'I was wondering how long is the access code for your office, it looks very secure!'},
	{from: 'admin', to: 'me', text: 'All i can say is that it is very long.'},
	{from: 'me', to: 'admin', text: 'Hmmm, then how do you remember it?'},
	{from: 'admin', to: 'me', text: 'I keep them safe in the notes feature provided by this application, it is very secure!'},
	{from: 'me', to: 'admin', text: 'Thanks!'},
]

// app state
let notReadMessages = []
let adminOnline = true

if (!dev) app.use(slowDown({
	windowMs: 5 * 60 * 1000, // 5 minutes
	delayAfter: 100,         // delay after 100 requests
	delayMs: 100             // incremental delay of 100ms
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Use appropriate headers
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', ['*'])
	res.header('Access-Control-Allow-Headers', ['*'])
	res.header('Content-Type', 'application/json')
	next()
})

// <routes></routes>
app.get('/:passcode/users', (req, res) => {
	let usersWithStatus = users.map(user => Object({ username: user, online: user === 'admin' && adminOnline}))

	// if admin
	if (req.params.passcode == passcode)
		return res.send(usersWithStatus.slice(1))

	// else (user)
	return res.send(usersWithStatus)
})

app.get('/:passcode/messages/:user', (req, res) => {
	// if admin
	if (req.params.passcode == passcode)
		return res.send(messages.map(message => {
			return { from: message.to, to: message.from, text: message.text }
		})

		.concat(notReadMessages.splice(0)))

	// else (user)
	return res.send(req.params.user === 'admin' ? messages : [])
})

app.post('/:passcode/messages', (req, res) => {
	// if admin
	if (req.params.passcode === passcode)
		return res.send({})

	if (typeof req.body.text !== 'string') return res.send({ error: 'INVALID_INPUT' })
	if (typeof req.body.to !== 'string') return res.send({ error: 'INVALID_INPUT' })

	// must be for admin
	if (req.body.to === 'admin') {
		notReadMessages.push({ from: 'admin', to: 'me', text: req.body.text })
	}


	return res.send({})
})

app.get('/:passcode/notes/', (req, res) => res.send({ notes: req.params.passcode === passcode ? flag : ''}))
app.get('/', (req, res) => res.send({ hello: 'world' }))


// start listening...
app.listen(port, () => console.log(`server running on port ${port}!`))
