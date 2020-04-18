
const router = require('express').Router();
let User = require('../models/user.model');

// router.route('/').get((req, res) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });


router.route('/:username').get((req, res) => {
    User.find({'username' : req.params.username})
      .then(users => {
        
        res.json(users)
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(users => {
        users.username = req.body.username;
        users.password = req.body.password;
        users.tested = req.body.tested;
  
        users.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });



module.exports = router;
