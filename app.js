require('./utils/db');

const
    Contact = require('./model/contact'),
    express = require('express'),
    expressLayout = require('express-ejs-layouts'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    methodOverride = require('method-override'),
    { body, validationResult, check } = require('express-validator'),
    { loadContact, findContact, addContact, duplicateCheck, deleteContactUI, updateContact } = require('./examples/contact-app'),
    { dbName, client } = require('./examples/mongodb'),
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
app.use(methodOverride('_method'));


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
app.get('/contact-app', async (req, res) => {
    // Contact.find().then((contact) => { res.send(contact) }); // Get data contact from MongoDB

    const contacts = await Contact.find(); // Get data contact from MongoDB (async await)

    // const contacts = loadContact(); // Get data contact from JSON file

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
    body('name').custom(async (value) => {
        const duplicate = await Contact.findOne({ name: value }); // Check duplicate data of MongoDB database

        // const duplicate = duplicateCheck(value); // Check duplicate data of JSON file

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
        // Add data contact to MongoDB database
        Contact.insertMany(req.body, (error, result) => {
            req.flash('msg', 'Contact added successfully!');
            res.redirect('/contact-app');
        });

        // Add data contact to JSON file
        // addContact(req.body);
        // req.flash('msg', 'Contact added successfully!');
        // res.redirect('/contact-app');
    }
});

// Delete Contact
// app.get('/contact-app/delete/:name', async (req, res) => {
//     const contact = await Contact.findOne({ name: req.params.name }); // Get data contact from MongoDB database

//     // const contact = findContact(req.params.name); // Get data contact from JSON file

//     if (!contact) {
//         res.status(404);
//         res.send('<h1>404</h1>');
//     } else {
//         // Delete data contact from MongoDB database
//         Contact.deleteOne({ _id: contact._id }).then((result) => {
//             req.flash('msg', 'Contact deleted successfully!');
//             res.redirect('/contact-app');
//         });

//         // Delete data contact from JSON file
//         // deleteContactUI(req.params.name);
//         // req.flash('msg', 'Contact deleted successfully!');
//         // res.redirect('/contact-app');
//     }
// });
app.delete('/contact-app', (req, res) => {
    Contact.deleteOne({ name: req.body.name }).then((result) => {
        req.flash('msg', 'Contact deleted successfully!');
        res.redirect('/contact-app');
    });
});

// Update Contact (input form)
app.get('/contact-app/update/:name', async (req, res) => {
    const contact = await Contact.findOne({ name: req.params.name }); // Get data contact from MongoDB database

    // const contact = findContact(req.params.name); // Get data contact from JSON file

    res.render('update', {
        layout: 'layouts/main',
        title: 'NodeJs Web Server',
        contact
    });
});

// Update Contact
// app.post('/contact-app/update', [
//     body('name').custom((value, { req }) => {
//         const duplicate = duplicateCheck(value);
//         if (value !== req.body.oldName && duplicate) {
//             throw new Error('Contact name is already used!');
//         }
//         return true;
//     }),
//     check('phone', 'Phone number is not valid!').isMobilePhone('id-ID'),
//     check('email', 'Email address is not valid!').isEmail()
// ], (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         // return res.status(400).json({ errors: errors.array() });
//         res.render('update', {
//             layout: 'layouts/main',
//             title: 'NodeJs Web Server',
//             errors: errors.array(),
//             contact: req.body
//         });
//     } else {
//         updateContact(req.body);
//         req.flash('msg', 'Contact updated successfully!');
//         res.redirect('/contact-app');
//     }
// });
app.put('/contact-app', [
    body('name').custom(async (value, { req }) => {
        const duplicate = await Contact.findOne({ name: value });
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
        res.render('update', {
            layout: 'layouts/main',
            title: 'NodeJs Web Server',
            errors: errors.array(),
            contact: req.body
        });
    } else {
        Contact.updateOne(
            { _id: req.body._id },
            {
                $set: {
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    status: req.body.status
                }
            }
        ).then((result) => {
            req.flash('msg', 'Contact updated successfully!');
            res.redirect('/contact-app');
        });
    }
});

// Contact Detail
app.get('/contact-app/:name', async (req, res) => {
    const contact = await Contact.findOne({ name: req.params.name }); // Get data contact from MongoDB (async await)

    // const contact = findContact(req.params.name); // Get data contact from JSON file

    res.render('detail', {
        layout: 'layouts/main',
        title: 'NodeJs Web Server',
        contact
    });
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));