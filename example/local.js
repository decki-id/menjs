function printName(name) {
    return `Hello, my name is ${name}.`;
}

const
    PI = 3.14,
    student = {
        name: 'Decki',
        age: 28,
        printStudent() {
            return `${this.name} is ${this.age} years old.`;
        }
    };

class Person {
    constructor() {
        console.log('Object of Person has been created.');
    }
}

// module.exports = printName; // Export only one function/variable/class in this file.

// Export everything in this file one by one.
// module.exports.printName = printName;
// module.exports.PI = PI;
// module.exports.student = student;
// module.exports.Person = Person;

// Export everything in this file as an object
module.exports = { printName, PI, student, Person };