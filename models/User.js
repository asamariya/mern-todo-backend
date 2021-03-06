const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  displayName: { type: String },
  toDoLists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ToDoList',
    },
  ],
});

module.exports = User = mongoose.model('users', userSchema);
