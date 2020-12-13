const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ThoughtSchema = new Schema (
  {
    thoughtText: {
      type: String,
      required: 'A thought must have text',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: 'A thought must be accompanied by a username'
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughSchema);

module.exports = Thought;