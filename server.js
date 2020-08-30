const dotenv = require('dotenv');
const app = require('./app');
// Config env
dotenv.config({
  path: './config.env',
});
// Require database
require('./db/mongoose');

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is setup in port ${port}`);
});
