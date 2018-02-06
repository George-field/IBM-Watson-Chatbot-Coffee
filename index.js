const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const watson = require('watson-developer-cloud');



app.use(bodyParser.urlencoded({extended:false}));

app.post('/message', function(req, res){



    var msgFrom = req.body.From;
    var msgBody = req.body.Body;
    var operator = "MochaBean Coffee operator"




    //creates a new instance of the Watson Conversation and sets the varialbles to my serivce username and password.
    var conversation = new watson.ConversationV1({
        username: 'Insert Username Here',
        password: 'Password Goes here',
        version_date:'2017-05-26'
    });
    //Below code block - Takes the input from the SMS message and adds it to a http request body in the watson libary. It then Sends that
    //message to my serivce that I have created.
    conversation.message({
        input:{text:msgBody},
        workspace_id: 'WorkspaceID Here',
    }, function(err, response){
        if(err){
            console.log(err)//logging any errors
        }else{
            console.log(response.output);//Debuging code to log output
            luigiMsg = response.output.text[0]
            res.send('<Response> <Message>' + " " + operator + " " + luigiMsg +' </Message></Response>')
            //parses the response message into a reponse variable that gets sent back to the phone.
        }
    });




});


    //Basic code to get the app to listen on port 3000
  app.listen(3000, function(){
      console.log('Listening on port 3000')
  })
