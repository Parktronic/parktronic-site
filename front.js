const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.FRONTEND_PORT || 3000;

// Обслуживание статических файлов из корневой директории
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.js'));
});

app.listen(PORT, () => {
    console.log(`Frontend server is running on port ${PORT}`);
});