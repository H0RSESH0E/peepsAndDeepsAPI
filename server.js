const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/peepsAndDeeps', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));