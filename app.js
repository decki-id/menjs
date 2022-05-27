const
    express = require('express'),
    expressLayout = require('express-ejs-layouts'),
    app = express(),
    port = 3000,
    { loadContact } = require('./example/contact-app');

app.set('view engine', 'ejs');

// Third-party middleware
app.use(expressLayout);

// Built-in middleware
app.use(express.static('public'));

// app.use('/', (req, res) => res.send('Hello son of a bitch!')); // showing every route that isn't defined
app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/main',
        title: 'NodeJs Web Server'
    });
});
app.get('/contact-app', (req, res) => {
    const contacts = loadContact();
    res.render('contact-app', {
        layout: 'layouts/main',
        title: 'NodeJs Web Server',
        contacts
    });
});
app.get('/contact-app/:name', (req, res) => {
    const contacts = findContact(req.params.name.toLowerCase());
    res.render('detail', {
        layout: 'layouts/main',
        title: 'NodeJs Web Server',
        contact
    });
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));