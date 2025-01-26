import express from 'express';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const db = new sqlite3.Database('./database.db');
const app = express();
app.use(express.json());

// Initialize database
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    instructor TEXT,
    price REAL,
    thumbnail TEXT,
    video_url TEXT
  )`);
});

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, 'secretkey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Routes
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  db.run('INSERT INTO users (email, password) VALUES (?, ?)', 
    [email, hashedPassword], 
    function(err) {
      if (err) return res.status(400).send('User already exists');
      res.send({ id: this.lastID });
    }
  );
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) return res.status(400).send('Invalid credentials');
    
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid credentials');
    
    const token = jwt.sign({ id: user.id }, 'secretkey');
    res.header('Authorization', token).send({ token });
  });
});

app.get('/api/courses', (req, res) => {
  db.all('SELECT * FROM courses', (err, rows) => {
    if (err) return res.status(500).send('Database error');
    res.send(rows);
  });
});

app.post('/api/courses', authenticate, (req, res) => {
  const { title, description, instructor, price, thumbnail, video_url } = req.body;
  
  db.run(`INSERT INTO courses 
    (title, description, instructor, price, thumbnail, video_url) 
    VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, instructor, price, thumbnail, video_url],
    function(err) {
      if (err) return res.status(500).send('Database error');
      res.send({ id: this.lastID });
    }
  );
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
