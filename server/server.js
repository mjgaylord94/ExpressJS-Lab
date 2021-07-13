const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

let app = express();

// middleware to console logs request urls
app.use((req, res, next) => {
    console.log(req.originalUrl);
    next()
})

// Form Submission.  Writes form submission into json file and reads the submit back to you.
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/form-submit', (req, res) => {
    let pushObject = {
        name: req.body.name,
        age: req.body.age,
        favMermaid: req.body.favMermaid
    }
    fs.writeFileSync(path.join(__dirname, '../form-submissions.json'), JSON.stringify(pushObject), function (err) {
        if (err) throw err;
        console.log('complete');
    });
    
    res.send("Form has been submitted.");
    
    fs.readFile(path.join(__dirname, '../form-submissions.json'), (err, data) => {
        if (err) console.log(err);
        console.log(JSON.parse(data));
    });
})

// Static
app.use(express.static(path.join(__dirname, '../public')));

// OG test to see if server is running.  It won't run due to Static above.
app.get('/', (req, res) => {
    res.send('Hello from the web server side...');
});

// Listener
app.listen(3000);