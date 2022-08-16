const express = require('express');
const routes = require('./controllers');

const db = require('./config/connection');
const {User} = require('./models') 

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// app.get('/all-users', (req, res) => {
//   // Using model in route to find all documents that are instances of that model
//   User.find({}, (err, result) => {
//     if (result) {
//       res.status(200).json(result);
//     } else {
//       console.log('Uh Oh, something went wrong');
//       res.status(500).json({ message: 'something went wrong' });
//     }
//   });
// });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

//Why isn't express.router() working on my user route?
//Which models model to use?    
//seed the db like on models/user