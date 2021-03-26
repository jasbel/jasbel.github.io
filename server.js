/* // load the things we need */
const express = require('express');
const app = express();
// const router = express.Router();
// const path = require('path');
// const fs = require('fs');
// const ejs = require("ejs");

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.engine('ejs', require('ejs').renderFile);

/* // set the view engine to ejs */
app.set('view engine', 'ejs');

/* // use res.render to load up an ejs view file */
app.get('/', function(req, res) {
    const mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    const tagline = "No programming concept is complete without a cute animal mascot.";

    res.render('pages/index', {
        mascots: mascots,
        tagline: tagline
    });
});

/* // about page */
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(4000, () => console.log('Example app listening on port 4000!'));

