const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Vibely backend is live 🚀");
});

app.use("/api/auth", authRoutes);

async function connectMongoIfEnabled() {
    const shouldConnectMongo = String(process.env.ENABLE_MONGO || "false").toLowerCase() === "true";

    if (!shouldConnectMongo) {
        console.log("MongoDB connection skipped (ENABLE_MONGO is not true)");
        return;
    }

    const mongoUri = (process.env.MONGO_URI || "").trim().replace(/;$/, "");
    const mongoDirectUri = (process.env.MONGO_URI_DIRECT || "").trim().replace(/;$/, "");
    if (!mongoUri) {
        console.log("MongoDB connection skipped (MONGO_URI is missing)");
        return;
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB Connected ✅");
    } catch (err) {
        console.log("Mongo Error (primary URI):", err);
        if (err && err.code === "ECONNREFUSED" && err.syscall === "querySrv") {
            if (mongoDirectUri) {
                try {
                    await mongoose.connect(mongoDirectUri);
                    console.log("MongoDB Connected ✅ (direct URI fallback)");
                    return;
                } catch (fallbackErr) {
                    console.log("Mongo Error (direct URI fallback):", fallbackErr);
                }
            }
            console.log("Mongo SRV lookup failed. Set MONGO_URI_DIRECT to a non-SRV URI for this network.");
        }
    }
}

connectMongoIfEnabled();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});