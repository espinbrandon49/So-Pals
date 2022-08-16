const express = require('express');
const routes = require('./controllers');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

//Which models model to use?    
//validate on puts
// *************************HAS 3
// * `GET` a single user by its `_id` and populated thought and friend data *********************
