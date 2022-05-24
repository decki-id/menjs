const
    fs = require('fs'), // core module
    readline = require('readline'), // core module
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    validator = require('validator'), // third-party module
    chalk = require('chalk'), // third-party module
    // question1 = () => { // Readline with Promise and Async Await (Contact App)
    //     return new Promise((resolve, reject) => {
    //         rl.question('What is your phone number? ', (phone) => {
    //             resolve(phone);
    //         });
    //     });
    // },
    // question2 = () => {
    //     return new Promise((resolve, reject) => {
    //         rl.question('What is your phone number? ', (phone) => {
    //             resolve(phone);
    //         });
    //     });
    // },
    // question3 = () => {
    //     return new Promise((resolve, reject) => {
    //         rl.question('What is your email address? ', (email) => {
    //             resolve(email);
    //         });
    //     });
    // },
    writeQuestion = (question) => { // Readline with Promise and Async Await (Contact App, refactor)
        return new Promise((resolve, reject) => {
            rl.question(question, (name) => {
                resolve(name);
            });
        });
    },
    loadContact = () => {
        const
            file = fs.readFileSync('../docs/contacts.json', 'utf-8'),
            contacts = JSON.parse(file);
        return contacts;
    },
    saveContact = (name, phone, email) => {
        try {
            fs.readFileSync('../docs/contacts.json', 'utf-8');
        } catch (e) {
            fs.writeFileSync('../docs/contacts.json', '[]', 'utf-8');
        }
        const
            contact = { name, phone, email },
            contacts = loadContact();
        checkDuplicateName = contacts.find(contact => contact.name === name),
            checkDuplicatePhone = contacts.find(contact => contact.phone === phone),
            checkDuplicateEmail = contacts.find(contact => contact.email === email);
        if (checkDuplicateName) {
            console.log(chalk.white.bgRed.bold('Contact already exists!'));
            return rl.close();
        }
        if (checkDuplicatePhone || !validator.isMobilePhone(phone, 'id-ID')) {
            console.log(chalk.white.bgRed.bold('Contact already exists or the phone number format is wrong!'));
            return rl.close();
        }
        if (checkDuplicateEmail || !validator.isEmail(email)) {
            console.log(chalk.white.bgRed.bold('Contact already exists or the email format is wrong!'));
            return rl.close();
        }
        contacts.push(contact);
        fs.writeFileSync('../docs/contacts.json', JSON.stringify(contacts), 'utf-8');
        console.log(chalk.white.bgGreen.bold('JSON file has been written/updated!'));
        rl.close();
    },
    listContact = () => {
        const contacts = loadContact();
        contacts.forEach((contact, i) => {
            console.log(`${i + 1}. ${contact.name}`);
            return rl.close();
        });
    },
    detailContact = (name) => {
        const contacts = loadContact();
        const contact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
        if (!contact) {
            console.log(chalk.white.bgRed.bold('Contact not found!'));
            return rl.close();
        }
        console.log(`${contact.name} | ${contact.phone} | ${contact.email}`);
        return rl.close();
    };

module.exports = { writeQuestion, saveContact, listContact, detailContact };