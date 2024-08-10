const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const captchaRoute = require('./routes/captcha'); // Import the captcha route

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.post('/api/data', (req, res) => {
    const { data } = req.body;
    res.send(`You sent: ${data}`);
});

app.use('/api/captcha', captchaRoute); // Use the captcha route

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
