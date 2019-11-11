const handleSignIn = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('[Sign In] Invalid form submission');
  }

  db('login')
    .where({email})
    .then(data => {
    const isMatch = bcrypt.compareSync(password, data[0].hash);
    if (isMatch) {
      db('users')
      .where({email})
      .then(user => {
      res.json(user[0]);
      })
      .catch(err => res.status(400).json('[Sign In] Unable to get user.'));
    } else {
      res.status(400).json('[Sign In] Email and password combination incorrect.');
    }

    })
    .catch(err => res.status(400).json('[Sign In] Email and password combination incorrect.'));
}


module.exports = {
handleSignIn: handleSignIn
};