// Install dependencies:
// npm install express body-parser jsonwebtoken

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'kevin-rionaldo';

app.use(bodyParser.json());

// Sample user data (in real scenario, use a database)
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Middleware for authorization
const authorize = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.use(authorize);

// Example protected route
app.get('/protected', (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

const PORT = 3000;

// Add this code to the previous file

const attendanceRecords = [];

app.post('/clockin', (req, res) => {
  const { ip, latitude, longitude } = req.body;

  if (!ip || !latitude || !longitude) {
    res.status(400).json({error: 'you must insert ip, latitude, and longitude in body'})
  }

  const attendanceData = {
    username: 'kevin',
    ip: ip,
    latitude: latitude,
    longitude: longitude,
    clockType: 'Clock In',
    timestamp: new Date().toISOString()
  };

  attendanceRecords.push(attendanceData);

  res.json({ message: 'Clock In Successful', data: attendanceData });
});

app.post('/clockout', (req, res) => {
  const { ip, latitude, longitude } = req.body;
  
  if (!ip || !latitude || !longitude) {
    res.status(400).json({error: 'you must insert ip, latitude, and longitude in body'})
  }

  const attendanceData = {
    username: 'kevin',
    ip: ip,
    latitude: latitude,
    longitude: longitude,
    clockType: 'Clock Out',
    timestamp: new Date().toISOString()
  };

  attendanceRecords.push(attendanceData);

  res.json({ message: 'Clock Out Successful', data: attendanceData });
});

// Get all attendance records (for testing purposes)
app.get('/attendance', (req, res) => {
  res.json({ attendanceRecords });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
