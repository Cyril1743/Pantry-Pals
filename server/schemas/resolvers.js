const { AuthenticationError } = require('apollo-server-express');
const { User, Recipes } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.findOne().populate('Recipes');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('Recipes');
        },
        recipes: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Recipes.find(params).sort({ createdAt: -1 });
        },
        recipe: async (parent, { recipeId }) => {
            return Recipes.findOne({ _id: recipeId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('Recipes');
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
        addRecipe: async (parent, { name, description, servings, ingredientName, ingredientAmount, ingredientUnit, order, stepText }, context) => {
            if (context.user) {
              const recipe = await Recipes.create({
                name,
                description,
                servings,
                ingredientName,
                ingredientAmount,
                ingredientUnit,
                order,
                stepText,
                recipeAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { recipes: recipe._id } }
              );
      
              return recipe;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addComment: async (parent, { recipeId, commentText }, context ) => {
            if(context.user) {
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
        removeRecipe: async ( parent, { recipeId }, context) => {
            if(context.user) {
                const recipe = await Recipes.findOneAndDelete({
                    _id: recipeId,
                    recipeAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { recipes: recipe._id } }
                );
                return recipe;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeComment: async ( parent, { recipeId, commentId }, context) => {
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