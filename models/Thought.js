const { Schema, model, Types } = require('mongoose');
const { formatDate } = require('../utils/formatDate');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()      
        },
        reactionBody: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateValue => formatDate(dateValue)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: [1, 'Please share your thought.'],
            max: [280, 'Please limit your thought to 280 characters']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateValue => formatDate(dateValue)
          },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;