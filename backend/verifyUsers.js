/**
 * Script to verify test users exist in MongoDB
 * Run: node verifyUsers.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user.model");

const MONGO_URI = process.env.MONGO_URI;

async function verifyUsers() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB\n");

        // Find our test users
        const testPhones = ["+918273243959", "+918394087798"];

        for (const phone of testPhones) {
            const user = await User.findOne({ phone });
            if (user) {
                console.log("User Found:");
                console.log("  ID:", user._id);
                console.log("  Name:", user.name);
                console.log("  Phone:", user.phone);
                console.log("  Type:", user.userType);
                console.log("  Blocked:", user.isBlocked);
                console.log("  Created:", user.createdAt);
                console.log("");
            } else {
                console.log("User NOT found for phone:", phone);
            }
        }

        // Total user count
        const totalUsers = await User.countDocuments();
        console.log("Total users in database:", totalUsers);

    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("\nDisconnected from MongoDB");
    }
}

verifyUsers();
