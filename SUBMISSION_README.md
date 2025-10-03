# MongoDB Data Layer Fundamentals and Advanced Techniques (Week 1)

This repository contains the complete solution for the MongoDB Week 1 assignment, covering data manipulation, advanced querying, aggregation pipelines, and performance optimization (Indexing).

The database used is **`plp_bookstore`**, hosted on a MongoDB Atlas cluster.

## 🛠️ Setup and Execution Steps

To replicate the actions in this project, follow these steps in your terminal (while inside the project directory):

### 1. Dependency Installation

Ensure you have Node.js installed and install the MongoDB driver:

```bash
npm install mongodb
2. Database Population (Task 1 & Setup)
The insert_books.js script uses your Atlas URI to create the plp_bookstore database and insert the 12 initial book documents.

Bash

node insert_books.js
(Verification: The terminal should confirm "12 books were successfully inserted...")

3. Execute Queries and Indexes (Tasks 2, 3, 4, 5)
The queries.js script executes all CRUD operations, advanced finds, aggregation pipelines, and creates the required indexes.

IMPORTANT: You must replace YOUR_ATLAS_CONNECTION_URI with your full, correct connection string when running the command.

Bash

mongosh "ATLAS_CONNECTION_URI" --file queries.js
📂 Submission Files
This repository contains the following files:

insert_books.js: Node.js script used for initial data population.

queries.js: Contains the MongoDB Shell commands for all tasks (CRUD, Aggregation, Indexing).

SUBMISSION_README.md: This file.

crud_verification.png: Screenshot confirming data integrity (see below).

index_verification.png: Screenshot confirming index creation (see below).

📊 Verification Screenshots
The following screenshots from MongoDB Compass validate the successful execution of the tasks.

1. CRUD and Data Verification (Task 2)
This image confirms that the book "Wuthering Heights" was deleted and the price for the book "1984" was successfully updated to 15.00.

Link to: crud_verification.png 

2. Index Verification (Task 5)
This image displays the list of indexes on the books collection, confirming the creation of the simple index on title (title_1) and the compound index on author and published_year (author_1_published_year_-1).

Link to: index_verification.png 