const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, minlength: 6 },
  displayName: { type: String },
  toDoLists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ToDoList',
    },
  ],
});

module.exports = User = mongoose.model('users', userSchema);
