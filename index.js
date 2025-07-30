const express = require('express');
const http = require('http');
const apiRoutes = require('./routes/api');

const app = express();
const server = http.createServer(app);
//console.log("server", server);
// Middlewares
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
