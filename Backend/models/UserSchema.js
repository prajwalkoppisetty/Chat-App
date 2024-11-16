// models/UserSchema.js
const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
    profileName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
    },
    phone: {
        type: String,
        required: true,
        unique: true, // Ensure phone numbers are unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: '/images/guest.png', // Default profile picture
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create a User model based on the schema
const User = mongoose.model('User ', userSchema);

// Export the User model
module.exports = User;