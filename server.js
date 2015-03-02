var express = require('express');
var bodyParser=require('body-parser');
var app = express();
var fbapi = require('facebook-api');
var client = fbapi.user(null); 


var mongojs=require('mongojs');
var db=mongojs("26jan",["svc1"]);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var output="";
function viewback(err, data) { 
    if(err) { 
        console.log("Error: " + JSON.stringify(err)); 
    } else { 
        output=data.name; 
        console.log(output);
    }
}

app.get("/serviceClients",function(req,res){
    db.svc1.find(function(err,docs){
    res.json(docs);
    });
});

app.post("/serviceClients",function(req,res){
  var svc=req.body;
    console.log(svc);
    db.svc1.insert(req.body,function(err,doc){
    res.json(doc);
    });
});

    


app.get("/serviceClients/:id",function(req,res){
var id=req.params.id;
    console.log(id);
    db.svc1.findOne({_id : mongojs.ObjectId(id)},function(err,doc){
        var input =doc.name;
        client.get(input).info(function(err, data){
        output=data.name; 
        console.log(output);
            res.send(data.name);});
        })
       // console.log(output);
        //res.send(JSON.stringify(output));
    });


        

app.delete("/serviceClients/:id",function(req,res){
  var id=req.params.id;
    console.log(id);
    db.svc1.remove({_id : mongojs.ObjectId(id)},
            function(err,doc){
            res.json(doc);
    } );
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('listening at http://%s:%s', host, port)

})