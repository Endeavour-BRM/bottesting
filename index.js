require('dotenv').config()
var restify = require('restify');
var builder = require('botbuilder');
var server = restify.createServer();
//const Botanalytics = require('botanalytics').MicrosoftBotFramework("1110240eaf0b10d2442d58089999fe0980058e9d");


server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

var inMemoryStorage = new builder.MemoryBotStorage();
var connector = new builder.ChatConnector({
    //appId: process.env.MICROSOFT_BOT_APP_ID,
    //appPassword: process.env.MICROSOFT_BOT_APP_PASSWORD
});

var bot = require('./lib/bot')(connector).set('storage', inMemoryStorage);

const logUserConversation = (event) => {
    //console.log('message: ' + event.text + ', user: ' + event.address.bot.name);
};

usermsg = ""
bot.use({
    receive: function (event, next) {
		msg = 'message: ' + event.text + ', user: ' + event.address.user.name +"\n";
		console.log(msg);
		usermsg = msg + "\n";
		next();
    },
    send: function (event, next) {
		msg = 'message: ' + event.text + ', user: ' + event.address.bot.name +"\n";
		bot.loadSession(event.address, (error, session) => {
			if(session.userData.history!=null){
				session.userData.history = session.userData.history + usermsg+ msg;
				usermsg = "";
				session.save();
			}
			else{
				session.userData.history = usermsg+ msg;
				session.save();
			}
				console.log(session.userData.history);
		});     
	  next();
    }
});





server.post('/gannett/messages', connector.listen());


//bot.use({
//receive: Botanalytics.receive,
//send: Botanalytics.send
//});