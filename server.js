var express = require("express");
var app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017/mywebdb";
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Unit');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.get('/', function (req,res) {
    res.render('indexMongo.html');
});

app.get('/api/units', (req,res) => {
    getAllUnits((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'get all units successful'});
        }
    });
});

app.post('/api/unit', (req,res)=>{
    let unit = req.body;
    postUnit(unit, (err, result) => {
        if (err) {
            console.error('Error posting unit:', err);
            res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
        } else {
            console.log('Unit posted successfully:', result);
            res.json({ statusCode: 201, data: result, message: 'success' });
        }
    });
});

function postUnit(unit,callback) {
    collection.insertOne(unit,callback);
}

function getAllUnits(callback){
    collection.find({}).toArray(callback);
}

app.listen(port,()=>{
    runDBConnection();
    console.log("App listening to: " + port);
});