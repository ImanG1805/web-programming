const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'kimlez123456', 
  database: 'skincare_blog', 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});


app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  connection.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).send('Error creating user');
    }
    res.status(201).send('User created');
  });
});


app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Error fetching users');
    }
    res.json(results);
  });
});



app.put('/users/:id', (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;
  const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
  connection.query(query, [name, email, password, id], (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).send('Error updating user');
    }
    res.send('User updated');
  });
});


app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).send('Error deleting user');
    }
    res.send('User deleted');
  });
});


app.post('/posts', (req, res) => {
  const { title, content, user_id } = req.body;
  const query = 'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)';
  connection.query(query, [title, content, user_id], (err, results) => {
    if (err) {
      console.error('Error creating post:', err);
      return res.status(500).send('Error creating post');
    }
    res.status(201).send('Post created');
  });
});

app.get('/posts', (req, res) => {
  const query = 'SELECT * FROM posts';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching posts:', err);
      return res.status(500).send('Error fetching posts');
    }
    res.json(results);
  });
});

app.put('/posts/:id', (req, res) => {
  const { title, content, user_id } = req.body;
  const { id } = req.params;
  const query = 'UPDATE posts SET title = ?, content = ?, user_id = ? WHERE id = ?';
  connection.query(query, [title, content, user_id, id], (err, results) => {
    if (err) {
      console.error('Error updating post:', err);
      return res.status(500).send('Error updating post');
    }
    res.send('Post updated');
  });
});

app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM posts WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting post:', err);
      return res.status(500).send('Error deleting post');
    }
    res.send('Post deleted');
  });
});

app.post('/comments', (req, res) => {
  const { user_id, post_id, comment_text } = req.body;
  const query = 'INSERT INTO comments (user_id, post_id, comment_text) VALUES (?, ?, ?)';
  connection.query(query, [user_id, post_id, comment_text], (err, results) => {
    if (err) {
      console.error('Error creating comment:', err);
      return res.status(500).send('Error creating comment');
    }
    res.status(201).send('Comment created');
  });
});

app.get('/comments', (req, res) => {
  const query = 'SELECT * FROM comments';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching comments:', err);
      return res.status(500).send('Error fetching comments');
    }
    res.json(results);
  });
});

app.put('/comments/:id', (req, res) => {
  const { comment_text } = req.body;
  const { id } = req.params;
  const query = 'UPDATE comments SET comment_text = ? WHERE id = ?';
  connection.query(query, [comment_text, id], (err, results) => {
    if (err) {
      console.error('Error updating comment:', err);
      return res.status(500).send('Error updating comment');
    }
    res.send('Comment updated');
  });
});


app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM comments WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting comment:', err);
      return res.status(500).send('Error deleting comment');
    }
    res.send('Comment deleted');
  });
});


app.post('/categories', (req, res) => {
  const { name, description } = req.body;
  const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';
  connection.query(query, [name, description], (err, results) => {
    if (err) {
      console.error('Error creating category:', err);
      return res.status(500).send('Error creating category');
    }
    res.status(201).send('Category created');
  });
});

app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM categories';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).send('Error fetching categories');
    }
    res.json(results);
  });
});


app.put('/categories/:id', (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  const query = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';
  connection.query(query, [name, description, id], (err, results) => {
    if (err) {
      console.error('Error updating category:', err);
      return res.status(500).send('Error updating category');
    }
    res.send('Category updated');
  });
});
4
app.delete('/categories/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM categories WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting category:', err);
      return res.status(500).send('Error deleting category');
    }
    res.send('Category deleted');
  });
});


app.post('/tags', (req, res) => {
  const { tag_name } = req.body;
  const query = 'INSERT INTO tags (tag_name) VALUES (?)';
  connection.query(query, [tag_name], (err, results) => {
    if (err) {
      console.error('Error creating tag:', err);
      return res.status(500).send('Error creating tag');
    }
    res.status(201).send('Tag created');
  });
});


app.get('/tags', (req, res) => {
  const query = 'SELECT * FROM tags';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching tags:', err);
      return res.status(500).send('Error fetching tags');
    }
    res.json(results);
  });
});

app.put('/tags/:id', (req, res) => {
  const { tag_name } = req.body;
  const { id } = req.params;
  const query = 'UPDATE tags SET tag_name = ? WHERE id = ?';
  connection.query(query, [tag_name, id], (err, results) => {
    if (err) {
      console.error('Error updating tag:', err);
      return res.status(500).send('Error updating tag');
    }
    res.send('Tag updated');
  });
});

app.delete('/tags/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tags WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting tag:', err);
      return res.status(500).send('Error deleting tag');
    }
    res.send('Tag deleted');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

