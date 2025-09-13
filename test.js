const http2 = require('http2');

// Example 1: Simple HTTP/2 GET request
function makeHTTP2Request() {
  const client = http2.connect('https://httpbin.org');
  
  const req = client.request({ ':path': '/get' });
  
  req.on('response', (headers) => {
    console.log('Response headers:', headers[':status']);
  });
  
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  
  req.on('end', () => {
    console.log('Response data:', JSON.parse(data));
    client.close();
  });
  
  req.on('error', (err) => {
    console.error('Request error:', err);
    client.close();
  });
  
  req.end();
}

// Example 2: HTTP/2 POST request with data
function makeHTTP2PostRequest() {
  const client = http2.connect('https://httpbin.org');
  
  const postData = JSON.stringify({ 
    message: 'Hello HTTP/2!',
    timestamp: new Date().toISOString()
  });
  
  const req = client.request({
    ':method': 'POST',
    ':path': '/post',
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(postData)
  });
  
  req.on('response', (headers) => {
    console.log('POST Response status:', headers[':status']);
  });
  
  let responseData = '';
  req.on('data', (chunk) => {
    responseData += chunk;
  });
  
  req.on('end', () => {
    console.log('POST Response:', JSON.parse(responseData));
    client.close();
  });
  
  req.on('error', (err) => {
    console.error('POST Request error:', err);
    client.close();
  });
  
  // Send the POST data
  req.write(postData);
  req.end();
}

// Example 3: Multiple concurrent HTTP/2 requests
function makeMultipleRequests() {
  const client = http2.connect('https://httpbin.org');
  let completedRequests = 0;
  const totalRequests = 3;
  
  function closeClientWhenDone() {
    completedRequests++;
    if (completedRequests === totalRequests) {
      client.close();
      console.log('All requests completed!');
    }
  }
  
  // Request 1: Get IP
  const req1 = client.request({ ':path': '/ip' });
  req1.on('data', (chunk) => {
    console.log('IP Response:', JSON.parse(chunk.toString()));
  });
  req1.on('end', closeClientWhenDone);
  req1.end();
  
  // Request 2: Get headers
  const req2 = client.request({ ':path': '/headers' });
  req2.on('data', (chunk) => {
    console.log('Headers Response:', JSON.parse(chunk.toString()));
  });
  req2.on('end', closeClientWhenDone);
  req2.end();
  
  // Request 3: Get user agent
  const req3 = client.request({ ':path': '/user-agent' });
  req3.on('data', (chunk) => {
    console.log('User Agent Response:', JSON.parse(chunk.toString()));
  });
  req3.on('end', closeClientWhenDone);
  req3.end();
}

// Run the examples
console.log('=== HTTP/2 GET Request ===');
makeHTTP2Request();

setTimeout(() => {
  console.log('\n=== HTTP/2 POST Request ===');
  makeHTTP2PostRequest();
}, 2000);

setTimeout(() => {
  console.log('\n=== Multiple HTTP/2 Requests ===');
  makeMultipleRequests();
}, 4000);