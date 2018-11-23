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
		this.client = Nightmare({ show: this.show }).goto(this.url)
		return this.client
	}

	checkMessages() {
		return this.client.goto(this.bridgeUrl)
		.goto(this.url).wait(this.wait).click('.user:first-of-type').wait(this.wait)
		.catch(e => console.log('[ERROR]', e))
	}
}

module.exports = Admin
