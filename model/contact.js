const
    mongoose = require('mongoose'),
    Contact = mongoose.model('Contact', {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    });

module.exports = Contact;