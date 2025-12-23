// Quick test script to verify the server works
require('dotenv').config();
const http = require('http');

const PORT = process.env.PORT || 3000;

// Test if server is running
const testConnection = () => {
    const options = {
        hostname: 'localhost',
        port: PORT,
        path: '/api/health',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            if (res.statusCode === 200) {
                console.log('✅ Server is running!');
                console.log('Response:', data);
            } else {
                console.log('⚠️  Server responded with status:', res.statusCode);
            }
        });
    });

    req.on('error', (e) => {
        console.error('❌ Server is NOT running!');
        console.error('Error:', e.message);
        console.log('\nTo start the server, run:');
        console.log('  cd backend');
        console.log('  npm install');
        console.log('  npm start');
    });

    req.end();
};

console.log(`Testing connection to http://localhost:${PORT}/api/health...`);
testConnection();






