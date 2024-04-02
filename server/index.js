const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/law-quiz');

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
