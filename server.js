const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000; // Use Vercel's assigned port or 5000 locally

// Enable CORS for your frontend domain (replace with your actual frontend URL)
const corsOptions = {
  origin: [
    "https://futjakot", // frontend URL
    "http://localhost:3000", // local frontend URL
  ],
  methods: "GET, POST, PUT, DELETE",
  credentials: true, // if you're dealing with cookies or authorization headers
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Temporary storage for registered users (in-memory storage)
const users = [];

// Registration endpoint
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Simple validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the user already exists
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  try {
    // Add the user to the "database" (in-memory storage here)
    const newUser = { username, email, password };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// View all registered users (optional, for testing)
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
