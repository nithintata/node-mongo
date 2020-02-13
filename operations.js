const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insert(document, (err, result) => {
       assert.equal(err, null);
       console.log("Inserted Successfully " + result.result.n + " documents");
       callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);

  coll.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  });

};

exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.deleteOne(document, (err, result) => {
    assert.equal(err, null);
    console.log("Removed the document " , document);
    callback(result);
  });
};

exports.removeDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  coll.drop((err, result) => {
    assert.equal(err, null);
    console.log("Removed Collection ");
    callback(result);
  });
};

exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  coll.updateOne(document, { $set : update }, null, (err, result) => {
    assert.equal(err, null);
    console.log("Updated the document with ", update);
    callback(result);
  })
};
