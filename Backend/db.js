const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://nawazuzaifa:learningmern@cluster0.xhdwy.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";
const connectIt = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected");
    const food_items = await mongoose.connection.db.collection("food_items");
    const foodCategory = await mongoose.connection.db.collection("food_catogary");
    const data = await food_items.find({}).toArray();
    const foodCat = await foodCategory.find({}).toArray();
    if (data && foodCat) {
      global.food_items = data;
      global.categories = foodCat;
    } else throw new Error("data not found");
  } catch (err) {
    console.log("err: " + err);
  }
};
module.exports = connectIt;
