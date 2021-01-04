const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, minlength: 6 },
  displayName: { type: String },
});

module.exports = User = mongoose.model('users', userSchema);
