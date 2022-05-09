const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PAS}@cluster0.v5jnc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const computerCollection = client.db("myComputers").collection("computer");
      
      // get all Computers
      app.get('/computers', async(req, res) =>{
        const query = {};
        const cursor = computerCollection.find(query);
        const computers = await cursor.toArray();
        res.send(computers);
      })

      app.get('/test', async(req, res) =>{
       
        res.send('test me');
      })

          // get a computer
          app.get('/computers/:id', async(req, res) =>{
            const id = req.params.id;
            
            const query = {_id:ObjectId(id)};
            const result =await computerCollection.findOne(query);
           
            res.send(result)

        })


        app.get('/computers', async(req, res) =>{
            const email = req.query.email;
            const query = {email : email};
           const cursor = computerCollection.find(query);
            const myItems = await cursor.toArray();
            res.send(myItems)
        })

        app.delete('/computers/:id', async(req, res) =>{
            const id = req.params.id;
            console.log(id)
            const query = {_id:ObjectId(id)};
            const result =await computerCollection.deleteOne(query);
           
            res.send(result)

        })
        
        app.post('/computers', async(req, res) =>{
            const newItem = req.body;
            const result = await computerCollection.insertOne(newItem);
        
            res.send(result);
          })
    

          app.put('/computers/:id', async(req, res) =>{
            const id = req.params.id;
            const updatedQuantity = req.body;
            console.log(updatedQuantity)
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true };
            const updatedFinal = {
                $set: {
                   quantity:updatedQuantity.quantity
                }
            };
          
            console.log(updatedFinal)
            const result = await computerCollection.updateOne(filter,updatedFinal, options);
            res.send(result);

        })

// add new quantity

app.put('/computers/:id', async(req, res) =>{
    const id = req.params.id;
    const updatedQuantity = req.body;
    // console.log(updatedQuantity)
    const filter = {_id: ObjectId(id)};
    const options = { upsert: true };
    const updatedFinal = {
        $set: {
           quantity:updatedQuantity.quantity
        }
    };
  
    console.log(updatedFinal)
    const result = await computerCollection.updateOne(filter,updatedFinal, options);
    res.send(result);

})


    }
    finally{

    }
}
run().catch(console.dir)




app.get('/', (req, res) =>{
    res.send('ami tik asi');
})


app.listen(port, () =>{
    console.log('tik ase chalu hoise', port);
})

