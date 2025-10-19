
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    if (name && email && message) {
        alert("Thank you, " + name + "! We have received your message.");
       
    } else {
        alert("Please fill in all fields.");

    }
});
// Get all users from the database
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving users');
        return;
      }
      res.json(results);
    });
  });
  

