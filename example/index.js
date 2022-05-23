const
    localFile = require('./local'), // local module
    fs = require('fs'), // core/nodejs module
    readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

// console.log(localFile.printName('Decki'), ' ~ ', localFile.PI, ' ~ ', localFile.student.printStudent(), ' ~ ', new localFile.Person);

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

// Readline
// rl.question('What is your name? ', (name) => {
//     rl.question('What is your phone number? ', (phone) => {
//         try {
//             fs.readFileSync('../docs/contacts.json', 'utf-8');
//         } catch (e) {
//             fs.writeFileSync('../docs/contacts.json', '[]', 'utf-8');
//         }
//         const
//             contact = { name, phone },
//             file = fs.readFileSync('../docs/contacts.json', 'utf-8'),
//             contacts = JSON.parse(file);
//         contacts.push(contact);
//         fs.writeFileSync('../docs/contacts.json', JSON.stringify(contacts), 'utf-8');
//         console.log('JSON file has been written/updated!');
//         rl.close();
//     });
// });