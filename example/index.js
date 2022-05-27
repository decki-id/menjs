const
    fs = require('fs'), // core module
    http = require('http'), // core module
    validator = require('validator'), // third-party module
    chalk = require('chalk'), // third-party module
    ucwords = require('ucwords'), // third-party module
    yargs = require('yargs'), // third-party module
    local = require('./local'), // local module
    contactApp = require('./contact-app'), // local module
    port = 3000,
    main = async () => {
        const
            name = await contactApp.writeQuestion('What is your name? '),
            phone = await contactApp.writeQuestion('What is your phone number? '),
            email = await contactApp.writeQuestion('What is your email address? ');
        contactApp.saveContact(name, phone, email);
    };

// console.log(local.printName('Decki'), ' ~ ', local.PI, ' ~ ', local.student.printStudent(), ' ~ ', new local.Person);

// Write string to file (synchronous)
// try {
//     fs.writeFileSync('../docs/test.txt', 'Hello world! (synchronous)');
//     console.log('File has been written/updated!');
// } catch (e) {
//     console.log(e);
// }

// Write string to file (asynchronous)
// fs.writeFile('../docs/test.txt', 'Hello world! (asynchronous)', (err) => {
//     if (err) throw err;
//     console.log('File has been written/updated!');
// });

// Read file (synchronous)
// const data = fs.readFileSync('../docs/test.txt');
// console.log(data.toString());

// Read file (asynchronous)
// fs.readFile('../docs/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// Make folder if not exists
// if (!fs.existsSync('../docs')) {
//     fs.mkdirSync('../docs');
// }

// Delete file
// if (fs.existsSync('../docs/contacts.json')) {
//     // fs.unlinkSync('../docs/contacts.json');
//     fs.rmSync('../docs/contacts.json');
//     console.log('File has been deleted!');
// }

// Validator
// console.log(validator.isEmail('decki@gmail.com'));
// console.log(validator.isMobilePhone('082216668131', 'id-ID'));
// console.log(validator.isNumeric('082216668131'));

// Chalk
// console.log(chalk.bgBlue.black.italic('Hello son of a bitch!'));

// Readline (Contact App)
// rl.question('What is your name? ', (name) => {
//     rl.question('What is your phone number? ', (phone) => {
//         rl.question('What is your email address? ', (email) => {
//             try {
//                 fs.readFileSync('../docs/contacts.json', 'utf-8');
//             } catch (e) {
//                 fs.writeFileSync('../docs/contacts.json', '[]', 'utf-8');
//             }
//             const
//                 contact = { name, phone, email },
//                 file = fs.readFileSync('../docs/contacts.json', 'utf-8'),
//                 contacts = JSON.parse(file);
//             contacts.push(contact);
//             fs.writeFileSync('../docs/contacts.json', JSON.stringify(contacts), 'utf-8');
//             console.log('JSON file has been written/updated!');
//             rl.close();
//         });
//     });
// });

// Contact App (command line)
// main(); // Execute Contact App (readline)
// yargs.command({ // Add contact (yargs)
//     command: 'add',
//     describe: 'Add a new contact',
//     builder: {
//         name: {
//             describe: 'Name of the contact',
//             demandOption: true,
//             type: 'string'
//         },
//         phone: {
//             describe: 'Phone number of the contact',
//             demandOption: true,
//             type: 'string'
//         },
//         email: {
//             describe: 'Email address of the contact',
//             demandOption: true,
//             type: 'string'
//         }
//     },
//     handler(argv) {
//         contactApp.saveContact(argv.name, argv.phone, argv.email);
//     }
// }).demandCommand();
// yargs.command({ // List all contacts (yargs)
//     command: 'list',
//     describe: 'List all contacts',
//     handler() {
//         contactApp.listContact();
//     }
// });
// yargs.command({ // Show detail of a contact (yargs)
//     command: 'detail',
//     describe: 'Show detail of a contact',
//     builder: {
//         name: {
//             describe: 'Name of the contact',
//             demandOption: true,
//             type: 'string'
//         }
//     },
//     handler(argv) {
//         contactApp.detailContact(argv.name);
//     }
// });
// yargs.command({ // Delete a contact (yargs)
//     command: 'delete',
//     describe: 'Delete a contact by name',
//     builder: {
//         name: {
//             describe: 'Name of the contact',
//             demandOption: true,
//             type: 'string'
//         }
//     },
//     handler(argv) {
//         contactApp.deleteContact(argv.name);
//     }
// });
// yargs.parse();

// Simple & hard coded Web Server with HTTP module
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const url = req.url;
    if (url === '/') {
        fs.readFile('../index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.write('Error: ' + err);
            } else {
                res.write(data);
                res.end();
            }
        });
    } else {
        res.write('<h1>Hello son of a bitch!</h1>');
        res.end();
    }
}).listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});