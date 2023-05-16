const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [
        {
        type: String,
        required: true,
        trim: true
        }
    ], 
    comments: [
        {
          commentText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
          },
          commentAuthor: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User'
            }
        ],
          createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
          },
        },
      ],
    recipeAuthor: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ]
})

const Recipes = model('Recipes', userSchema);

module.exports = Recipes;