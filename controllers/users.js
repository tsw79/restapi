const User = require("../models/User");

module.exports.controller = (app) => {
  
  // get all users
  app.get('/api/users', (req, res) => {
    User.find({}, 'name username email', function (err, users) {
      if (err) { 
        console.log(err); 
      }
      res.send(users);
    })
  })

  // get a particular user by its id
  app.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id, 'name username email', function (err, user) {
      if (err) { 
        console.log(err); 
      }
      res.send(user);
    })
  })

  // add a new user
  app.post('/api/users', (req, res) => { 
    const user = new User({      
      name: req.body.name,
      username: req.body.username,
      email: req.body.email
    });
    user.save(function (err, user) {
      if (err) { 
        console.log(err); 
      }
      res.send(user);
    })
  })

  // update a user
  app.put('/api/users/:id', (req, res) => {
    User.findById(req.params.id, 'name username email', function (err, user) {
      if (err) { 
        console.error(err); 
      }
      // update the user details
      user.name = req.body.name;
      user.username = req.body.username;
      user.email = req.body.email;
      // save to db
      user.save(function (error, user) {
        if (error) { 
          console.log(error); 
        }
        res.send(user);
      })
    })
  })

  // delete a user
  app.delete('/api/users/:id', (req, res) => {
    User.remove({_id: req.params.id}, function(err, user) {
      if (err) { 
        console.error(err); 
      }
      res.send({ success: true });
    })
  })
}