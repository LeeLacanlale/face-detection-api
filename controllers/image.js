const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'f762c1ebe3db4298a7ac939c84ceea7a'
 });

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('[API] Call error.'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where({id})
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('[Image] Error getting entries'));
}
    
  module.exports = {
    handleImage,
    handleApiCall
  };