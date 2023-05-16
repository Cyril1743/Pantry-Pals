const db = require('../config/connection');
const { Recipes, User } = require('../models');
const recipeSeeds = require('./recipeSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    await Recipes.deleteMany({});
    await Recipes.create(recipeSeeds);

    await User.deleteMany({});
    await User.create(userSeeds);

    console.log('seed done');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});