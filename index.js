const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(express.json());
app.use(cors());
// alamin0
// nNGTwvvlahg68p4G



const uri = "mongodb+srv://alamin0:nNGTwvvlahg68p4G@cluster0.v5jnc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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

          // get a computer
          app.get('/computer/:id', async(req, res) =>{
            const id = req.params.id;
            
            const query = {_id:ObjectId(id)};
            const result =await computerCollection.findOne(query);
           
            res.send(result)

        })

        app.delete('/computer/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result =await computerCollection.deleteOne(query);
           
            res.send(result)

        })
        
        app.post('/computers', async(req, res) =>{
            const newItem = req.body;
            const result = await computerCollection.insertOne(newItem);
        
            res.send(result);
          })
    

        app.put('/computer/:id', async(req, res) =>{
            const id = req.params.id;
            const updateQuantity = req.body;
            console.log(updateQuantity)
            const filter = {_id:ObjectId(id)};
            const options = {upsert: true};
            const updatedQuantity = {
                $set:{
                    quantity: updateQuantity.quantity
                }
            }
            const result =await computerCollection.updateOne(filter, updatedQuantity, options);
            res.send(result)
            

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

