const
    { MongoClient, ObjectId } = require('mongodb'),
    uri = 'mongodb://127.0.0.1:27017',
    dbName = 'menjs',
    client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

client.connect((err, client) => {
    if (err) {
        return console.log(err);
    }

    const db = client.db(dbName);

    // Insert a single document
    // db.collection('students').insertOne(
    //     {
    //         name: 'John',
    //         phone: '+7 (903) 123-45-67',
    //         email: 'johndoe@gmail.com'
    //     },
    //     (error, result) => {
    //         if (error) {
    //             return console.log(error);
    //         }

    //         console.log(result);
    //     }
    // );

    // Insert multiple documents
    // db.collection('students').insertMany(
    //     [
    //         {
    //             name: 'John',
    //             phone: '+7 (903) 123-45-67',
    //             email: 'johndoe@gmail.com'
    //         },
    //         {
    //             name: 'Jane',
    //             phone: '+79031281946',
    //             email: 'janethor@yahoo.com'
    //         }
    //     ],
    //     (error, result) => {
    //         if (error) {
    //             return console.log(error);
    //         }

    //         console.log(result);
    //     }
    // );

    // Update a document
    // db.collection('students').updateOne(
    //     {
    //         name: 'Zainudin'
    //     },
    //     {
    //         $set: {
    //             status: 'Inactive'
    //         }
    //     }
    // );

    // Update documents
    db.collection('students').updateMany(
        {
            status: "Inactive"
        },
        {
            $set: {
                phone: "+79031234567"
            }
        }
    );

    // Find all documents
    console.log(db.collection('students').find().toArray((error, result) => { console.log(result) }));

    // Find documents by query
    // console.log(db.collection('students').find({ name: 'John' }).toArray((error, result) => { console.log(result) }));
});