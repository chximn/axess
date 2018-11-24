const Nightmare = require('nightmare')

class Admin {
	constructor(options = {}) {
		if (!options.hasOwnProperty('url')) throw new Error('URL not provided to admin')
		if (!options.hasOwnProperty('bridgeUrl')) throw new Error('URL not provided to bridgeUrl')

		this.url = options.url
		this.bridgeUrl = options.bridgeUrl
		this.wait = options.wait || 3000
		this.show = options.show || false
	}

	init() {
		this.client = Nightmare({ show: this.show })
		this.client.goto(this.url).catch(e => console.log(e))
		return this.client
	}

	checkMessages() {
		let req = this.client.goto(this.bridgeUrl).goto(this.url).wait(this.wait).click('.user:first-of-type').wait(this.wait)
		req.catch(e => console.log('[ERROR]', e))
		return req
	}
}

module.exports = Admin
