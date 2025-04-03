const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../dist')));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({ status: "Error", error: err });
        if (data.length > 0) {
        // ✅ Send back full user object including `id`
        return res.json({
            status: "Success",
            user: {
            id: data[0].id,       // <-- make sure your table has a column named `id`
            name: data[0].name,
            email: data[0].email
            }
        });
        } else {
        return res.json({ status: "Failed" });
        }
    });
});


app.get('/transactions/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT t.*, c.name AS category_name FROM transactions t JOIN categories c ON t.category_id = c.id WHERE t.user_id = ?";
    
    db.query(sql, [userId], (err, data) => {
        if (err) {
        console.error("Fetch error:", err);
        return res.status(500).json("Error fetching transactions");
        }
        return res.json(data);
    });
    });

    app.post('/add-transaction', (req, res) => {
        const { userId, categoryId, type, amount, description, date } = req.body;
    
        const sql = `
            INSERT INTO transactions (user_id, category_id, type, amount, description, date)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
    
        db.query(sql, [userId, categoryId, type, amount, description, date], (err, result) => {
            if (err) {
                console.error("Insert error:", err);
                return res.status(500).json({ error: "Failed to insert transaction" });
            }
            res.json({ message: "Transaction added successfully", id: result.insertId });
        });
    });

    app.get('/categories/:type', (req, res) => {
        const type = req.params.type;
        const sql = "SELECT * FROM categories WHERE type = ?";
        db.query(sql, [type], (err, data) => {
            if (err) return res.status(500).json("Database error");
            return res.json(data);
        });
    });

    app.post('/update-transaction/:id', (req, res) => {
        const id = req.params.id;
        const { userId, categoryId, type, amount, description, date } = req.body;
    
        const sql = `
            UPDATE transactions
            SET user_id = ?, category_id = ?, type = ?, amount = ?, description = ?, date = ?
            WHERE id = ?
        `;
        
        db.query(sql, [userId, categoryId, type, amount, description, date, id], (err, data) => {
            if (err) {
            console.error("Update error:", err);
            return res.status(500).json("Error updating transaction");
            }
            return res.json("Transaction updated");
        });
        });

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../dist/index.html'));
            });
          
          const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

    
    app.listen(PORT, () => {
    console.log("listening");
    });
