const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const APIKeySchema = new Schema({
  name: {
    type: String,
    default: 'Default',
  },
  role: {
    type: String,
    enum: ['admin', 'guest'],
    required: true,
  },
});

const APIKeyModel = model('APIKey', APIKeySchema);
module.exports = APIKeyModel;
