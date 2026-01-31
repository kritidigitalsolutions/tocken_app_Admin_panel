const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/admin/properties/697d981a61e39eac327ae499',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Status Code:', res.statusCode);
      console.log('Success:', json.success);
      console.log('Has property:', !!json.property);
      console.log('Images:', JSON.stringify(json.property?.images, null, 2));
    } catch (e) {
      console.log('Response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.end();
