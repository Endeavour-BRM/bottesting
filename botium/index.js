const BotDriver = require('botium-core').BotDriver
const Capabilities = require('botium-core').Capabilities
const Source = require('botium-core').Source
var assert = require('assert');

const driver = new BotDriver()
	
driver.BuildFluent()
    .Start()
	.UserSaysText('hi')
	.WaitBotSaysText(console.log)
	.Stop()
	.Clean()
	.Exec()
	.then(() => {
    console.log('PASSED')
	  })
	  .catch((err) => {
		console.log('ERROR: ', err)
	  })