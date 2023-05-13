const mongoose = require('mongoose')

//TODO: Change the mongodb name to reflect the project name
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/project-3')

module.exports = mongoose.connection