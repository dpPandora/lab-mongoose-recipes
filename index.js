const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.01:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    //let testRecipe = Recipe.create([{
    //  title: "test recipe",
    //  cuisine: "idk"
    //}])
    //  .then(recipe => console.log(`created ${recipe}\n${testRecipe}`))
    //  .catch(err => console.log(err));
    //
    //module.exports = testRecipe;

    await Recipe.insertMany(data)
      .then(imp => imp.forEach(dish => console.log(dish.title)))
      .catch(err => console.log(err));
    
    await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
      .then(console.log("updated!"))
      .catch(err => console.log(err));

    await Recipe.deleteOne({title: "Carrot Cake"})
      .then(console.log("removed carrot cake!"))
      .catch(err => console.log(err));

    mongoose.disconnect()
      .then(console.log("connection closed"))
      .catch(err => console.log(err));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

