const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
   assert.equal(err, null);
   console.log('Connected Properly to server');

   const db = client.db(dbname);

   dboper.insertDocument(db, {name : "nuts", description : "Test"}, 'dishes', (result) => {
      console.log('Insert document: \n', result.ops);

      dboper.findDocuments(db, 'dishes', (docs) => {
        console.log('Found documents:\n', docs);

        dboper.updateDocument(db, {name : 'nuts'}, {description: 'Updated Test'}, 'dishes', (result) =>{
            console.log('Updated document:\n', result.result);

            dboper.findDocuments(db, 'dishes', (docs) => {
              console.log('Found documents:\n', docs);

              db.dropCollection('dishes', (result)=> {
                console.log('Dropped collection: ', result);
                client.close();
              });
            });
        });
      });
   });
 });
