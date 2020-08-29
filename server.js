const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
console.log(process.env.MONGODB_URL);
