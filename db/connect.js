const mongoose = require('mongoose')

const connectDB = (url) => {
    try {
        console.log('MongoDB Connected')
        return mongoose.connect(url)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB
