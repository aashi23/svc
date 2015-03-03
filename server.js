var express = require('express');
var bodyParser=require('body-parser');
var app = express();
var fbapi = require('facebook-api');
var client = fbapi.user(null); 


//var mongojs=require('mongojs');
//var db=mongojs("26jan",["svc1"]);
mongoose.connect('mongodb://aashi23:tiger@ds049537.mongolab.com:49537/svc')
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
    db.svc.insert(req.body,function(err,doc){
    res.json(doc);
    });
});

    


app.get("/serviceClients/:id",function(req,res){
var id=req.params.id;
    console.log(id);
    db.svc.findOne({_id : mongojs.ObjectId(id)},function(err,doc){
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
    db.svc.remove({_id : mongojs.ObjectId(id)},
            function(err,doc){
            res.json(doc);
    } );
});

//var server = app.listen(3000, function () {

  //var host = server.address().address
  //var port = server.address().port

  //console.log('listening at http://%s:%s', host, port)

//})

app.listen(process.env.PORT || 5000);
console.log("Server running on port no. 5000");
