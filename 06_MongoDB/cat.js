const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://NitinSharma:nitin111@meteorwhite.adl7s.mongodb.net/Cats"
);

const Cat = mongoose.model("Cat", { name: String });

const run = async () => {
  // Create a new cat document
  const kitty = new Cat({ name: "pip" });

  // Save the kitty document
  await kitty.save();
  console.log("meow");

  // Fetch all cats from the database
  const cats = await Cat.find();
  console.log(cats); // This will now log the saved cats
};

run().catch((err) => console.error(err));
