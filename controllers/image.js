const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '245f746d8470433682b6de5e9805104f'
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