const { Schema, model } = require('mongoose');

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
    recipeAuthor: {
        type: String,
        required: true
    },
    ingredients: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Ingredients',
        }
    ],
    comments: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Comments',
        }
    ]
})

const Recipes = model('Recipes', userSchema);

module.exports = Recipes;