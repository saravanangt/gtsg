var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonQuery = require('json-query');
var fs = require('fs');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format

var data = JSON.parse(fs.readFileSync('Staff.json', 'utf8'));
var str='';
var result = jsonQuery('employee[**][*LOCATION=Singapore]', {data: data}).value;
 setTimeout(function() {
      console.log(result);
 for (var value of result) {
  str=str+value.NAME+" "
}
    response={
  "messages": {
  "type": "static_select"
 
},
 "data": {
 
  "slack":  [
        {
	"type": "actions",
	"elements": [					
			{
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select an item",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Excellent item 1",
							"emoji": true
						},
						"value": "value-0"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Fantastic item 2",
							"emoji": true
						},
						"value": "value-1"
					}
				]
			}
		]
	}
]
    
}
}
/* response = {
"speech": "this text is spoken out loud if the platform supports voice interactions",
"displayText": "this text is displayed visually",
"messages": {
  "type": 1,
  "title": "card title",
  "subtitle": "card text",
  "imageUrl": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png"
},
"data": {
 
  "slack": {
    "text": "This is a text response for Slack.Hurray Got it after long time"+str
  }
}

};*/
   console.log(response);
   res.send(response);
}, 500);  
 

   

})

var server = app.listen(8383, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
