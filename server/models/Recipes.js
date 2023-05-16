const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true
    },
    servings: {
      type: Number
    },
    ingredients: [
        {
        ingredientName: {
            type: String, 
            required: true,
            trim: true
        },
        ingredientAmount: {
            type: Number,
            required: true,           
        },
        ingredientUnit: {
            type: String
        }
        }
    ],
    steps: [
      {
        order: {
          type: Number,
          required: true,
        },
        stepText: {
          type: String,
            required: true,
            minlength: 1,
            maxlength: 200,
        }
      }
    ], 
    comments: [
        {
          commentText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 1000,
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
    recipeAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    
})

const Recipes = model('Recipes', recipeSchema);

module.exports = Recipes;