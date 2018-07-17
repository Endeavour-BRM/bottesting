const BotDriver = require('botium-core').BotDriver
const Capabilities = require('botium-core').Capabilities
const Source = require('botium-core').Source
var assert = require('assert');

const driver = new BotDriver()
	
driver.BuildFluent()
  .ReadScripts('convos')
  .Start()
  .RunScripts()
  .Exec()
	.then(() => {
    console.log('PASSED')
	  })
	  .catch((err) => {
		console.log('ERROR: ', err)
	  })
