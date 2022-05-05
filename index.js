const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send('ami tik asi');
})


app.listen(port, () =>{
    console.log('tik ase chalu hoise', port);
})

