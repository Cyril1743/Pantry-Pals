const db = require('../config/connection');
const { Recipes, User, Ingredient, Comment } = require('../models');
const recipeSeeds = require('./recipeSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    await Recipes.deleteMany({});
    await Recipes.create(recipeSeeds);

    await User.deleteMany({});
    await User.create(userSeeds);

    await Ingredient.deleteMany({});
    await Ingredient.create(ingredientSeeds);

    await Comment.deleteMany({});
    await Comment.create(commentSeeds);

    console.log('seed done');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});