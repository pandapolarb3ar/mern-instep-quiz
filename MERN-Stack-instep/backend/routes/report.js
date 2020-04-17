const router = require('express').Router();
let Report = require('../models/report.model');



router.route('/add').post((req, res) => {
  const username = req.body.username;
  const score = req.body.score;
  const test = req.body.test;
  
  const newReport = new Report({
    username,
    score,
    test,
  });

  newReport.save()
  .then(() => res.json('report added!'))
  .catch(err => res.status(400).json('Error2: ' + err));
});


router.route('/:username').get((req, res) => {
  Report.find({"username" : req.params.username})
    .then(report => res.json(report[0]["_id"]))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Report.findById(req.params.id)
    .then(report => {
      report.username = req.body.username;
      report.test= req.body.test;
      report.score = Number(req.body.score);

      report.save()
        .then(() => res.json('Report updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;