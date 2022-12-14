
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });
mongoose.set('runValidators', true);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },

  number: {
    type: Number,
    minLength: 8,
    required: true
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

personSchema.plugin(uniqueValidator);

//   const Person = mongoose.model('Person', personSchema)
module.exports = mongoose.model('Person', personSchema,'persons');
