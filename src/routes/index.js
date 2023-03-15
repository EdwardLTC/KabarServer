var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
})


router.get('/area/:shape', (req, res) => {
  const shape = req.params.shape;
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  
  let area;
  switch (shape) {
    case 'circle':
      area = Math.PI * a * a;
      break;
    case 'rectangle':
      area = a * b;
      break;
    case 'square':
      area = a * a;
      break;
    default:
      area = null;
  }

  if (area !== null) {
    res.json({ shape: shape, area: area });
  } else {
    res.status(400).json({ error: 'Invalid shape.' });
  }
});


router.post('/perimeter', (req, res) => {
  const shape = req.body.shape;
  const a = parseFloat(req.body.a);
  const b = parseFloat(req.body.b);

  let perimeter;
  switch (shape) {
    case 'circle':
      perimeter = 2 * Math.PI * a;
      break;
    case 'rectangle':
      perimeter = 2 * (a + b);
      break;
    case 'square':
      perimeter = 4 * a;
      break;
    default:
      perimeter = null;
  }

  if (perimeter !== null) {
    res.json({ shape: shape, perimeter: perimeter });
  } else {
    res.status(400).json({ error: 'Invalid shape.' });
  }
});


module.exports = router;

/**
 * req: request
 *  -req.query: get data from url  //http://localhost:3000/?name=abc
 *  -req.param: get data from url  //http://localhost:3000/abc/1/2/3
 *  -req.body: get data from form  //http://localhost:3000/
 * res: response
 *  -res.render: send data to client (HTML)
 *  -res.json: send data to client (API)
 *  -res.send: send data to client (HTML, API)
 *  -res.redirect: redirect to another page
 *  -res.download: download file
 *  -res.sendFile: send file to client
 *  -res.sendStatus: send status to client
 * next: next middleware
 *  -next(): go to next middleware
 *  -next('route'): go to next route
 *  -next(err): go to error handler
 *  -next('router'): go to next router
 *  -next('throw'): throw error
 *  -next('pass'): pass to next middleware
 */

/**
 * HTTP: Request Methods
 * GET: Get data from server
 * POST: Send data to server
 * PUT:  Update a specified resource
 * DELETE: Delete a specified resource
 */