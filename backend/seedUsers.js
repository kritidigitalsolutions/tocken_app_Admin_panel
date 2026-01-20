/**
 * Seed script to add test users to MongoDB
 * Run: node seedUsers.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user.model");

const MONGO_URI = process.env.MONGO_URI;

const testUsers = [
    {
        name: "Test User 1",
        phone: "+918273243959",
        userType: "INDIVIDUAL",
        isBlocked: false
    },
    {
        name: "Test User 2",
        phone: "+918394087798",
        userType: "AGENT",
        isBlocked: false
    }
];

async function seedUsers() {
    try {
        console.log("🔗 Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        for (const userData of testUsers) {
            // Check if user already exists
            const existingUser = await User.findOne({ phone: userData.phone });

            if (existingUser) {
                console.log(`⚠️  User with phone ${userData.phone} already exists`);
            } else {
                const newUser = await User.create(userData);
                console.log(`✅ Created user: ${newUser.name} (${newUser.phone})`);
            }
        }

        console.log("\n🎉 Seed completed successfully!");
    } catch (error) {
        console.error("❌ Error seeding users:", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB");
        process.exit(0);
    }
}

seedUsers();
