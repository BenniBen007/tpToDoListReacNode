const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/itemNode');

const ItemSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', ItemSchema);

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/', (req,res) => {
    res.send('Hello world');
});

app.get('/api/items', (req,res) => {
    Item.find((err, kittens) => {
        if (err) return console.error(err);
            res.status(200).send(kittens);
        });
})

app.post('/api/item', (req, res) => {
    const lItem = new Item({ name: req.query.text });
    lItem.save();
    res.send("Insere !");
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Listening on port '+port));