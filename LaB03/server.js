/**
 * LAB03 - Node.js Simple Calculator using Connect
 * Author: Jaskaran Singh
 * Description:
 * This server uses the Connect module to handle simple calculator operations
 * (add, subtract, multiply, divide) through query parameters.
 * Example usage:
 *    http://localhost:3000/lab3?method=add&x=16&y=4
 * The server responds with the result of the operation.
 */

const connect = require('connect');
const http = require('http');

const app = connect();

// Calculator handler for both /lab2 and /lab3
function calculator(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = (url.searchParams.get('method') || '').toLowerCase();
  const x = parseFloat(url.searchParams.get('x'));
  const y = parseFloat(url.searchParams.get('y'));

  res.setHeader('Content-Type', 'text/plain');

  // Input validation
  if (!method || isNaN(x) || isNaN(y)) {
    res.statusCode = 400;
    res.end(
      'Error: Missing or invalid parameters.\n' +
      'Example: /lab3?method=add&x=16&y=4'
    );
    return;
  }

  let result;
  let symbol;

  // Perform the requested calculation
  switch (method) {
    case 'add':
      result = x + y;
      symbol = '+';
      break;
    case 'subtract':
      result = x - y;
      symbol = '-';
      break;
    case 'multiply':
      result = x * y;
      symbol = '*';
      break;
    case 'divide':
      if (y === 0) {
        res.statusCode = 400;
        res.end('Error: Division by zero is not allowed.');
        return;
      }
      result = x / y;
      symbol = '/';
      break;
    default:
      res.statusCode = 400;
      res.end('Error: Invalid method. Use add, subtract, multiply, or divide.');
      return;
  }

  res.end(`${x} ${symbol} ${y} = ${result}\n`);
}

// Attach routes BEFORE the root message
app.use('/lab3', calculator);
app.use('/lab2', calculator);

// Root message for homepage
app.use('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Server is up. Try: /lab3?method=add&x=16&y=4\n');
});

// Create and start the server
http.createServer(app).listen(3000, () => {
  console.log('Server running at http://localhost:3000');
  console.log('Try: /lab3?method=add&x=16&y=4');
});
