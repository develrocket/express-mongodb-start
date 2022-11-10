const mongoose = require('mongoose');

const {Schema} = mongoose;

// create a schema
const ContactSchema = new Schema({
    name: String,
    email: String,
    subject: String,
    content: String
}, {
    timestamps: true
});

// create the model
const ContactModel = mongoose.model('contact', ContactSchema);

// export the model
module.exports = ContactModel;
