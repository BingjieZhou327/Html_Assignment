/**
 * Backend Example for Assignment 10
 * This is a simplified example showing the required API structure.
 * You should implement proper authentication, database integration, and error handling.
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key'; // Use environment variable in production

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// In-memory storage (Replace with actual database)
let users = [
  {
    id: '1',
    username: 'admin',
    password: '$2b$10$YourHashedPasswordHere', // bcrypt hash of 'admin123'
    name: 'Admin User',
    email: 'admin@example.com',
    type: 'admin'
  },
  {
    id: '2',
    username: 'employee',
    password: '$2b$10$YourHashedPasswordHere', // bcrypt hash of 'employee123'
    name: 'Employee User',
    email: 'employee@example.com',
    type: 'employee'
  }
];

let jobs = [
  {
    id: '1',
    companyName: 'Tech Corp',
    jobTitle: 'Senior Developer',
    description: 'We are looking for an experienced developer to join our team.',
    salary: 120000,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    companyName: 'StartUp Inc',
    jobTitle: 'Product Manager',
    description: 'Join our dynamic team and help shape our product vision.',
    salary: 95000,
    createdAt: new Date().toISOString()
  }
];

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to check admin role
const requireAdmin = (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Routes

/**
 * POST /api/login
 * Authenticate user and return token with user type
 */
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Verify password (use bcrypt.compare in production)
    // For demo purposes, accepting plain text password
    const isValidPassword = password === 'admin123' || password === 'employee123';
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, type: user.type },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      token,
      user: userWithoutPassword,
      type: user.type
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * POST /api/user/create
 * Create a new user with specified type
 */
app.post('/api/user/create', async (req, res) => {
  try {
    const { username, password, name, email, type } = req.body;

    // Validate required fields
    if (!username || !password || !email || !type) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate type field
    if (type !== 'admin' && type !== 'employee') {
      return res.status(400).json({ message: 'Type must be either "admin" or "employee"' });
    }

    // Check if user already exists
    if (users.find(u => u.username === username)) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    if (users.find(u => u.email === email)) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Create new user (hash password in production)
    const newUser = {
      id: String(users.length + 1),
      username,
      password: password, // Hash this with bcrypt in production
      name,
      email,
      type
    };

    users.push(newUser);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * GET /api/users
 * Get all users (Admin only) - excludes passwords
 */
app.get('/api/users', authenticateToken, requireAdmin, (req, res) => {
  try {
    // Return users without passwords
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPasswords);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * GET /api/jobs
 * Get all job postings
 */
app.get('/api/jobs', authenticateToken, (req, res) => {
  try {
    res.json(jobs);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * POST /api/create/job
 * Create a new job posting (Admin only)
 */
app.post('/api/create/job', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { companyName, jobTitle, description, salary } = req.body;

    // Validate required fields
    if (!companyName || !jobTitle || !description || !salary) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate salary
    if (typeof salary !== 'number' || salary <= 0) {
      return res.status(400).json({ message: 'Salary must be a positive number' });
    }

    // Create new job
    const newJob = {
      id: String(jobs.length + 1),
      companyName,
      jobTitle,
      description,
      salary,
      createdBy: req.user.id,
      createdAt: new Date().toISOString()
    };

    jobs.push(newJob);

    res.status(201).json(newJob);
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * GET /api/images
 * Example endpoint for fetching images (from previous assignment)
 */
app.get('/api/images', authenticateToken, (req, res) => {
  try {
    // Return mock image data
    const images = [
      { id: 1, url: 'https://via.placeholder.com/300', title: 'Image 1' },
      { id: 2, url: 'https://via.placeholder.com/300', title: 'Image 2' },
      { id: 3, url: 'https://via.placeholder.com/300', title: 'Image 3' }
    ];
    res.json(images);
  } catch (error) {
    console.error('Get images error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('\nTest Credentials:');
  console.log('Admin: username=admin, password=admin123');
  console.log('Employee: username=employee, password=employee123');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

