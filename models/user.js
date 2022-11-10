const mongoose = require('mongoose');

const {Schema} = mongoose;

// create a schema
const UserSchema = new Schema({
    username: String,
    email: String,
    password: String
}, {
    timestamps: true
});

// create the model
const UserModel = mongoose.model('user', UserSchema);

// export the model
module.exports = UserModel;
