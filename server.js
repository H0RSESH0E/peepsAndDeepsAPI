const express = require('express');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client'));

app.use(require('./routes'));

app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));