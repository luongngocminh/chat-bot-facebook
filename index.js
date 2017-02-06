
var request = require("request");
var login = require("facebook-chat-api");
const spawn = require('child_process').spawn;


var answeredThreads = {};
var tkb = {};
tkb["Mon"]="Chào Cờ, Sinh Hoạt, Hóa, Toán, Lí";
tkb["Tue"]="Sử, Tin, Anh, Anh, Hóa";
tkb["Wed"]="Lí, Lí, Văn, GDCD, Toán";
tkb["Thu"]="Sinh, Văn, Văn, Toán, Toán";
tkb["Fri"]="Toán, Hóa, Tin, Quốc Phòng, Công Nghệ";
tkb["Sat"]="Anh, Địa, Công Nghệ, Toán, Toán";


login({email: {{YOUR_EMAIL}}, password: {{YOUR_PASSWORD}}}, function callback(err, api){
	if(err) return console.error(err);

	var stopListening = api.listen(function(err, event) {
        if(err) return console.error(err);

        switch(event.type) {
          case "message":
            response(event,api);
            
            break;
          case "event":
            console.log(event);
            break;
        }
    });
})

function response(ev,api) {
	
    if(ev.body.indexOf('/tkb: ') == 0)
    {
        api.sendMessage(tkb[ev.body.split(": ")[1]], ev.threadID);        	
   	}
   	else if(ev.body.indexOf('/youtube: ') == 0)
   	{

   		request({
    		url: "http://lamoscar-official.com/you/index.php?key="+ev.body.split(": ")[1],
    		json: true
		}, function (error, response, body) {

	    	if (!error && response.statusCode === 200) {

	    		api.sendMessage(body["messages"][1]["text"],ev.threadID); 
	    		api.sendMessage(body["messages"][0]["text"],ev.threadID); 
    	}
})
   		
   	}
    else {
    	api.sendMessage("TEST BOT: " + ev.body, ev.threadID);
    }
    api.markAsRead(ev.threadID, function(err) {
        if(err) console.log(err);
    });
}


