const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");
const generateToken = require("../utils/generateToken");

// Register
router.post("/register", async (req, res) => {
    const { email, password, redirectTo } = req.body;

    const emailRedirectTo = typeof redirectTo === "string" && redirectTo.trim()
        ? redirectTo.trim()
        : undefined;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo
        }
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    const token = generateToken(data.user.id);

    res.json({
        message: "User registered successfully",
        token,
        user: data.user
    });
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    const token = generateToken(data.user.id);

    res.json({
        message: "User logged in successfully",
        token,
        user: data.user
    });
});

module.exports = router;