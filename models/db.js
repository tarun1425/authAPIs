const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(()=> console.log('MongoDB connection established'))
    .catch((err)=> console.log('MongoDB connection not established'));

require('./user.model');
