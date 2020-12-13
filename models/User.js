const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String, 
      unique: true,
      required: "Valid username is required!",
      trimmed: true
    },
    email: {
      type: String,
      required: true, 
      unique: true,
      match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: 'Thoughts'
    },
    friends: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

UserSchema.virtual('friendCount').get(function(){
  return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;