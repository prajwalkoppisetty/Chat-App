// Import required modules
const express = require('express'); // Web framework for building APIs
const cors = require('cors'); // Middleware to enable CORS
const mongoose = require('mongoose'); // MongoDB object modeling tool
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
        const existingUser = await User.findOne({ $or: [{ username }, { phone }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            profileName,
            username,
            phone,
            email,
            password, // Store the password as plain text for now (not recommended in production)
            profilePicture: profilePicture || '/images/guest.png', // Default profile picture
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful', user: { username: user.username } });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/', (req, res) => {
    res.send('Chat Matrix Server Page');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
