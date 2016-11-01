![cf](http://i.imgur.com/7v5ASc8.png) express-middleware
====

Use express `Router` to externalize routes from `app.js`, create a body-parser
express middleware and a error handler that are used by
your existing app.

## Description
1. Move your resource CRUD routes to a separate module that exports an `express.Router`

2. Create an express middleware function that parses incoming JSON, 
on a successful parse the JSON object should be saved to `req.body`
and the `next` function called. On a failed parse the middleware should
call `next` with error that includes appropriate status code and a message 
like "invalid json".

3. Add error handling middleware that handles sending error responses. Direct
all route errors to this handler. Errors should be consistent format and style.
Use http response status code to indicate error status, not the response body.

Testing:
* Existing e2e API tests should handle the addition of this middleware, though 
you may need to modify based on consistent error handling.

* Body-parser should be unit tested as pure function.

## Bonus
* Unit test error handler **2pts**

## Rubric
  * Router: 2pts
  * Body Parser: 2pts
  * Error handler: 2pts
  * Code quality and organization: 2pts
  * Testing: 2pts
