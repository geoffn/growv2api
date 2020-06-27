const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/growv2api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})