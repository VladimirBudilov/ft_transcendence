const express = require('express');
const path = require('path');

const app = express();


app.use('/src', express.static(path.resolve(__dirname, 'frontend', 'src')));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Content-Type", "application/javascript");
//   next();
// });
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log('Server working...'));

