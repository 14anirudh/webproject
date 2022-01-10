const express = require("express");
const path = require("path");

const app = express();
const mongoose = require('mongoose');
// const bodyparser = require("body-parser")
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost/Dance');
}

const port = Process.env.PORT || 800;
//defining mongoose schema
const DanceSchema = new mongoose.Schema({
    name: String,
    issue: String,
    phone: String,
    email: String,
    address: String

});
const Dance = mongoose.model('dance', DanceSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {

    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {

    const params = {}
    res.status(200).render('contact.pug', params);
});
app.get('/services', (req, res) => {

    const params = {}
    res.status(200).render('services.pug', params);
});
app.get('/about', (req, res) => {

    const params = {}
    res.status(200).render('about.pug', params);
});

app.post('/contact', (req, res) => {
    var mydata = new Dance(req.body)
    mydata.save().then(() => {
        res.send("this item has been saved to database")
    }).catch(() => {
        res.status(400).send("item cannot be saved to the database")
    });

    // res.status(200).render('contact.pug');
})
app.listen(port, () => {
    console.log(`the application statrted successfully on port${port}`);
})