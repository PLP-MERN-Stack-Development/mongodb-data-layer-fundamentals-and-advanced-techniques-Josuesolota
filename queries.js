// queries.js - Solutions for Tasks 2, 3, 4, and 5

// --- CONNECTION ---
// mongosh will connect using the URI provided in the command line.
use("plp_bookstore");

// =========================================================
// --- Task 2: Basic CRUD Operations ---
// =========================================================

console.log("--- Task 2: Basic CRUD Operations ---");

// 1. Find all books in a specific genre (Fiction)
console.log("\n1. Find all books in the 'Fiction' genre:");
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year (e.g., after 1950)
console.log("\n2. Find books published after 1950:");
db.books.find({ published_year: { $gt: 1950 } });

// 3. Find books by a specific author (George Orwell)
console.log("\n3. Find books by 'George Orwell':");
db.books.find({ author: "George Orwell" });

// 4. Update the price of a specific book (Update "1984" to 15.00)
console.log("\n4. Update the price of '1984' to 15.00:");
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 15.00 } }
);

// 5. Delete a book by its title (Delete "Wuthering Heights")
console.log("\n5. Delete the book 'Wuthering Heights':");
db.books.deleteOne({ title: "Wuthering Heights" });


// =========================================================
// --- Task 3: Advanced Queries ---
// =========================================================

console.log("\n--- Task 3: Advanced Queries ---");

// 1. Find books that are both in stock AND published after 2010
console.log("\n1. Books in stock AND published after 2010:");
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 },
});

// 2. Use projection to return only title, author, and price
console.log("\n2. Use projection (Title, Author, Price only):");
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
);

// 3. Implement sorting by price (ascending)
console.log("\n3. Sort by price (Ascending):");
db.books.find().sort({ price: 1 });

// 4. Implement sorting by price (descending)
console.log("\n4. Sort by price (Descending):");
db.books.find().sort({ price: -1 });

// 5. Use limit and skip for pagination (5 books per page)
// Page 1: Sorted by title for consistency
console.log("\n5. Pagination - Page 1 (Limit 5, Skip 0):");
db.books.find().sort({ title: 1 }).limit(5).skip(0);

// Page 2: Sorted by title for consistency
console.log("\n5. Pagination - Page 2 (Limit 5, Skip 5):");
db.books.find().sort({ title: 1 }).limit(5).skip(5);


// =========================================================
// --- Task 4: Aggregation Pipeline ---
// =========================================================

console.log("\n--- Task 4: Aggregation Pipeline ---");

// 1. Calculate the average price of books by genre
console.log("\n1. Average price of books by genre:");
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  },
  { $sort: { averagePrice: -1 } }
]);

// 2. Find the author with the most books in the collection
console.log("\n2. Author with the most books in the collection:");
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);

// 3. Group books by publication decade and count them
console.log("\n3. Book count by publication decade:");
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);


// =========================================================
// --- Task 5: Indexing ---
// =========================================================

console.log("\n--- Task 5: Indexing ---");

// 1. Create an index on the 'title' field for faster searches
console.log("\n1. Create index on the 'title' field:");
db.books.createIndex({ title: 1 });

// 2. Create a compound index on 'author' and 'published_year'
console.log("\n2. Create compound index on 'author' and 'published_year':");
db.books.createIndex({ author: 1, published_year: -1 });

// 3. Use the explain() method to demonstrate performance

// 3a. Search by title (should use the new 'title' index)
console.log("\n3a. Explain search by title (Using 'title' index):");
db.books.find({ title: "The Hobbit" }).explain("executionStats");
/* Check 'totalKeysExamined' > 0 and 'winningPlan.stage' = 'IXSCAN' for success. */

// 3b. Search by author and sort by published_year (should use the compound index)
console.log("\n3b. Explain search by author and sort (Using compound index):");
db.books
  .find({ author: "J.R.R. Tolkien" })
  .sort({ published_year: -1 })
  .explain("executionStats");
/* Note that there should be no separate 'SORT' stage. */

// Optional: List all indexes to verify
console.log("\n--- List all indexes on the 'books' collection ---");
db.books.getIndexes();