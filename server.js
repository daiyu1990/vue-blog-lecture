const express = require('express');
const history = require('connect-history-api-fallback');

var app = express();
app.use(express.static(__dirname));
app.use(history());

app.listen(3000, () => {
  console.log('port 3000');
})
