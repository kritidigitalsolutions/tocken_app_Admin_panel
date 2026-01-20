const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "About Us"
        },
        content: {
            type: String,
            required: true
        },
        mission: {
            type: String,
            default: ""
        },
        vision: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            enum: ["Active", "Draft"],
            default: "Draft"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("AboutUs", aboutUsSchema);
