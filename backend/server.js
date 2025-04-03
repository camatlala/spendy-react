const express = require("express");
const cors = require("cors");
const { connectToMongo, getDB } = require("./db"); // MongoDB connection
const { ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

let db;

connectToMongo().then(() => {
    db = getDB();

  // ✅ Login
    app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.collection("login").findOne({ email, password });

        if (user) {
        return res.json({
            status: "Success",
            user: {
            id: user._id,
            name: user.name,
            email: user.email,
            },
        });
        } else {
        return res.json({ status: "Failed" });
        }
    } catch (err) {
        res.status(500).json({ status: "Error", error: err });
    }
    });

    // ✅ Signup Route
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

      // Check if user already exists
        const existingUser = await db.collection("login").findOne({ email });
        if (existingUser) {
        return res.status(409).json({ message: "Email already registered" });
    }

      // Insert new user
        await db.collection("login").insertOne({ name, email, password });
        return res.status(201).json({ message: "Signup successful" });
    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "Signup failed", error: err });
    }
    });  

  // ✅ Get Transactions by User
    app.get("/transactions/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const transactions = await db.collection("transactions").find({ user_id: userId }).toArray();
        res.json(transactions);
    } catch (err) {
        res.status(500).json("Error fetching transactions");
    }
    });

  // ✅ Add Transaction
    app.post("/add-transaction", async (req, res) => {
    try {
        const { userId, categoryId, type, amount, description, date } = req.body;

        await db.collection("transactions").insertOne({
        user_id: userId,
        category_id: categoryId,
        type,
        amount,
        description,
        date,
        });

        res.json({ status: "Success" });
    } catch (err) {
        res.status(500).json({ status: "Error", error: err });
    }
    });

  // ✅ Update Transaction
    app.post("/update-transaction/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        await db.collection("transactions").updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
        );

        res.json({ status: "Success" });
    } catch (err) {
        res.status(500).json({ status: "Error", error: err });
    }
    });

  // ✅ Get Categories by Type
    app.get("/categories/:type", async (req, res) => {
    try {
        const type = req.params.type;
        const categories = await db.collection("categories").find({ type }).toArray();
        res.json(categories);
    } catch (err) {
        res.status(500).json("Database error");
    }
    });

  // ✅ Start the server
    const PORT = process.env.PORT || 8081;
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });
});
