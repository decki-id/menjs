const
    express = require('express'),
    expressLayout = require('express-ejs-layouts'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    { body, validationResult, check } = require('express-validator'),
    { loadContact, findContact, addContact, duplicateCheck, deleteContactUI, updateContact } = require('./example/contact-app'),
    app = express(),
    port = 3000;


// Middleware configuration

// Built-in middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Third-party middleware
app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());


// Routes

// Showing every route that isn't defined
// app.use('/', (req, res) => res.send('Hello son of a bitch!'));

// Index
app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/main',
        title: 'NodeJs Web Server'
    });
});

// Contact List
app.get('/contact-app', (req, res) => {
    const contacts = loadContact();
    res.render('contact-app', {
        layout: 'layouts/main',
        title: 'NodeJs Web Server',
        contacts,
        msg: req.flash('msg')
    });
});

// Add Contact (input form)
app.get('/contact-app/add', (req, res) => {
    res.render('add', {
        layout: 'layouts/main',
        title: 'NodeJs Web Server'
    });
});

// Add Contact
app.post('/contact-app', [
    body('name').custom((value) => {
        const duplicate = duplicateCheck(value);
        if (duplicate) {
            throw new Error('Contact already exists!');
        }
        return true;
    }),
    check('phone', 'Phone number is not valid!').isMobilePhone('id-ID'),
    check('email', 'Email address is not valid!').isEmail()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        res.render('add', {
            layout: 'layouts/main',
            title: 'NodeJs Web Server',
            errors: errors.array()
        });
    } else {
        addContact(req.body);
        req.flash('msg', 'Contact added successfully!');
        res.redirect('/contact-app');
    }
});

// Delete Contact
app.get('/contact-app/delete/:name', (req, res) => {
    const contact = findContact(req.params.name);
    if (!contact) {
        res.status(404);
        res.send('<h1>404</h1>');
    } else {
        deleteContactUI(req.params.name);
        req.flash('msg', 'Contact deleted successfully!');
        res.redirect('/contact-app');
    }
});

// Update Contact (input form)
app.get('/contact-app/update/:name', (req, res) => {
    const contact = findContact(req.params.name);
    res.render('update', {
        layout: 'layouts/main',
        title: 'NodeJs Web Server',
        contact
    });
});

// Update Contact
app.post('/contact-app/update', [
    body('name').custom((value, { req }) => {
        const duplicate = duplicateCheck(value);
        if (value !== req.body.oldName && duplicate) {
            throw new Error('Contact name is already used!');
        }
        return true;
    }),
    check('phone', 'Phone number is not valid!').isMobilePhone('id-ID'),
    check('email', 'Email address is not valid!').isEmail()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        res.render('update', {
            layout: 'layouts/main',
            title: 'NodeJs Web Server',
            errors: errors.array(),
            contact: req.body
        });
    } else {
        updateContact(req.body);
        req.flash('msg', 'Contact updated successfully!');
        res.redirect('/contact-app');
    }
});

// Contact Detail
app.get('/contact-app/:name', (req, res) => {
    const contact = findContact(req.params.name);
    res.render('detail', {
        layout: 'layouts/main',
        title: 'NodeJs Web Server',
        contact
    });
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));