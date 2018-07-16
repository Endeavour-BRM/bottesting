require('dotenv').config()
var restify = require('restify');
var builder = require('botbuilder');
var server = restify.createServer();
const Botanalytics = require('botanalytics').MicrosoftBotFramework("11102eb03c2359000437a8dbd6fb28dbbff226d9");


server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_BOT_APP_ID,
    appPassword: process.env.MICROSOFT_BOT_APP_PASSWORD
});
var bot = require('./lib/bot')(connector);


bot.use({
receive: Botanalytics.receive,
send: Botanalytics.send
});

server.post('/api/messages', connector.listen());