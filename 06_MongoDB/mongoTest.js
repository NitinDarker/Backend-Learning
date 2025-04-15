const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(mongoDbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
});

const Blog = mongoose.model("Blog", blogSchema);

const businessBlog = new Blog({
    title: 'Business',
    author: 'Nitin Ji',
    body: 'Nice',
    comments: [],
    hidden: false
});

await businessBlog.save()

Blog.find({ age: { $gte: 18 } })
  .then((users) => console.log("👀 Users:", users))
  .catch((err) => console.error("❌ Query failed:", err));

  // Let's assume createInitialBlog() ran and we have the ID or can query for it.
// For demonstration, let's get the blog object again:
async function runUpdateExamples() {
  try {
    const blogToUpdate = await Blog.findOne({ title: 'Business', author: 'Nitin Ji' });

    if (!blogToUpdate) {
      console.log("Could not find the blog to update. Run the create script first.");
      return;
    }

    console.log("\n--- Found Blog to Update ---");
    console.log(blogToUpdate);
    const blogId = blogToUpdate._id; // Get the ID for later examples

    // ==================================================
    // Method 1: Using Document.save()
    // ==================================================
    // - Fetch the document.
    // - Modify the document object in your Node.js application.
    // - Call the `.save()` method on the document instance.
    // - Pros: Runs middleware (like 'pre save' hooks) and full validation. Intuitive if you already have the object.
    // - Cons: Requires two DB operations (find + update). Can be less efficient.

    console.log("\n--- Method 1: Updating via document.save() ---");
    blogToUpdate.body = 'This is the updated body content using save().';
    blogToUpdate.hidden = true;
    // Add a comment to the array
    blogToUpdate.comments.push({ body: 'First comment!', date: new Date() });

    const updatedBlogSaved = await blogToUpdate.save(); // Persist changes
    console.log("Blog updated via save():", updatedBlogSaved);


    // ==================================================
    // Method 2: Using Model.updateOne() or Model.updateMany()
    // ==================================================
    // - Send an update command directly to MongoDB without fetching the document first.
    // - Uses MongoDB Update Operators (like $set, $inc, $push, $unset).
    // - `updateOne` modifies the *first* document found matching the filter.
    // - `updateMany` modifies *all* documents matching the filter.
    // - Pros: More efficient (often one DB operation). Good for simple updates or updating many docs.
    // - Cons: Doesn't return the updated document by default (just status). Doesn't run `save()` middleware by default.

    console.log("\n--- Method 2: Updating via Model.updateOne() ---");
    const updateOneResult = await Blog.updateOne(
      { _id: blogId }, // Filter: Find the blog by its ID
      {
        $set: { author: 'Nitin Gupta', hidden: false }, // Update specific fields
        $inc: { 'meta.votes': 1 } // Increment the votes count by 1
      }
    );
    console.log("updateOne() result:", updateOneResult); // Shows { acknowledged: true, modifiedCount: 1, matchedCount: 1 ... }
    // Note: We don't get the updated document back here. We'd have to query again to see the changes.


    // ==================================================
    // Method 3: Using Model.findOneAndUpdate() or Model.findByIdAndUpdate()
    // ==================================================
    // - Finds a document, updates it, and returns the document (atomically).
    // - `findOneAndUpdate` uses a query filter.
    // - `findByIdAndUpdate` is a shortcut using the document's `_id`.
    // - Uses MongoDB Update Operators.
    // - Pros: Atomic find-and-update. Can return the updated document. Efficient.
    // - Cons: Doesn't run `save()` middleware by default.
    // - Option: `{ new: true }` returns the document *after* the update. Default is `false` (returns the document *before* the update).

    console.log("\n--- Method 3: Updating via Model.findByIdAndUpdate() ---");
    const updatedBlogReturned = await Blog.findByIdAndUpdate(
      blogId, // ID of the document to update
      {
        $set: { body: 'Updated again using findByIdAndUpdate!' },
        $push: { comments: { body: 'Another comment via findByIdAndUpdate', date: new Date() } }, // Add another comment
        $inc: { 'meta.favs': 1 } // Increment favs
      },
      { new: true, runValidators: true } // Options: Return the modified document, run schema validators on update
    );

    if (updatedBlogReturned) {
      console.log("findByIdAndUpdate() returned (new) document:", updatedBlogReturned);
    } else {
      console.log("findByIdAndUpdate() did not find a document with that ID.");
    }

  } catch (error) {
    console.error("\n--- An Error Occurred During Updates ---");
    // Handle potential validation errors from findByIdAndUpdate with runValidators:true
    if (error.name === 'ValidationError') {
       console.error('Validation Error:', error.message);
    } else {
       console.error(error);
    }
  } finally {
      // Optional: Close connection if running as a standalone script
      // await mongoose.disconnect();
  }
}

// Run the examples
createInitialBlog().then(() => {
  runUpdateExamples();
});