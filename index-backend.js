const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();

// PostgreSQL config
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Sakura_Elite',
    password: 'Nithish18',
    port: 5433,   
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

app.use(express.static(__dirname));
app.use(express.json());

app.post("/login", async (req, res) => {
    const { unit, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT password FROM unit_info WHERE unit_number = $1",
            [unit] // unit is now something like 'GF1'
        );

        if (result.rows.length === 0) {
            return res.json({ success: false, error: "Unit not found" });
        }

        if (result.rows[0].password === password) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});