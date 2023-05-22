const { AuthenticationError } = require('apollo-server-express');
const { User, Recipes } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({}).populate('recipe');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('recipe');
        },
        recipes: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Recipes.find(params).sort({ createdAt: -1 }).populate('recipeAuthor');
        },
        recipe: async (parent, { recipeId }) => {
            return Recipes.findOne({ _id: recipeId }).populate('recipeAuthor');
        },
        suggestRecipe: async (parent, { name }) => {
            const regexStarting = new RegExp(`^${name}`, "i")
            const recipes = await Recipes.find({ name: { $regex: regexStarting } }).populate('recipeAuthor')

            if (recipes.length == 0){
                const regexAnywhere = new RegExp(name, 'i')
                const recipes = await Recipes.find({name: { $regex: regexAnywhere}}).populate('recipeAuthor')

                return recipes
            }

            return recipes
        },
        suggestIngredient: async (parent, { ingredients }) => {
            const recipesData = await Promise.all(ingredients.map(async ingredient => {
                return await Recipes.find({ 'ingredients.ingredientName': { $regex: ingredient, $options: 'i' } }).populate('recipeAuthor')
            }))

            const recipes = recipesData[0]

            const matchedRecipes = recipes.filter((recipe) => {

                if (!recipe.ingredients) {
                    return false
                }

                const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredientName)
                return ingredients.every(ingredient => {
                    const regex = new RegExp(ingredient, 'i')
                    return recipeIngredients.some(recipeIngredient => regex.test(recipeIngredient))
                })
            })

            return matchedRecipes
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('recipe');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addRecipe: async (parent, { name, description, servings, ingredients, steps }, context) => {
            if (context.user) {
                const recipe = await Recipes.create({
                    name,
                    description,
                    servings,
                    ingredients,
                    steps,
                    recipeAuthor: context.user._id,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { recipe: recipe._id } }
                );

                return recipe;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addComment: async (parent, { recipeId, commentText }, context) => {
            if (context.user) {
                return Recipes.findOneAndUpdate(
                    { _id: recipeId },
                    {
                        $addToSet: {
                            comments: { commentText, commentAuthor: context.user.username },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeRecipe: async (parent, { recipeId }, context) => {
            if (context.user) {
                const recipe = await Recipes.findOneAndDelete({
                    _id: recipeId,
                    recipeAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { recipe: recipe._id } }
                );
                return recipe;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeComment: async (parent, { recipeId, commentId }, context) => {
            if (context.user) {
                return Recipes.findOneAndUpdate(
                    { _id: recipeId },
                    {
                        $pull: {
                            comments: {
                                _id: commentId,
                                commentAuthor: context.user.username,
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;