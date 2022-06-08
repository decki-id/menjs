const
    mongoose = require('mongoose'),
    Contact = require('../model/contact');

mongoose.connect('mongodb://127.0.0.1:27017/menjs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Add a new data
// const addContact = new Contact({
//     name: 'Yayat Jatnika Swadaya Pratama Dipraja',
//     phone: '0812-1234-1234',
//     email: 'yayat.jatnika@selebew.com',
//     status: 'Active'
// });

// Save data to collections
// addContact.save().then((contact) => console.log(contact));