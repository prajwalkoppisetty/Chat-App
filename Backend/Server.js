// Import required modules
const express = require('express'); // Web framework for building APIs
const cors = require('cors'); // Middleware to enable CORS
const mongoose = require('mongoose'); // MongoDB object modeling tool
const bcrypt = require('bcrypt'); // Library to hash passwords
const User = require('./models/UserSchema'); // Import the User model

// Create an instance of Express
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Chat-Matrix', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB successfully");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Signup route
app.post('/signup', async (req, res) => {
    const { profileName, username, phone, email, password, profilePicture } = req.body;

    // Basic validation
    if (!profileName || !username || !phone || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const existingUser  = await User.findOne({ $or: [{ username }, { phone }, { email }] });
        if (existingUser ) {
            return res.status(400).json({ message: 'User  already exists' });
        }

        // Hash the password
        

        // Create a new user
        const newUser  = new User({
            profileName,
            username,
            phone,
            email,
            password,
            profilePicture: profilePicture || '/images/guest.png', // Default profile picture
        });

        // Save the user to the database
        await newUser .save();

        // Respond with success message
        res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});