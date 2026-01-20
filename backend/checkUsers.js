require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user.model");

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({}).select("name phone userType createdAt");
    console.log(JSON.stringify(users, null, 2));
    console.log("Total:", users.length);
    await mongoose.disconnect();
}
check();
