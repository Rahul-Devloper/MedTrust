# SaaS Server

## Middlewares

- BodyParser: Populates the values in the `req.body` object
- Compression: The data exchanged between the server and client is compressed, to save network bandwidth
            and decrease latency
- CookieParser: It looks at the cookie header, we can access it by `req.cookie.key`
- Morgan: HTTP request logger middleware for node.js
- Passport: Authentication middleware for Node.js

## Know more

- Once the user is Authenticated, the user is stored in the `req.user`. The req object you get from the
  client, now has a user object inside of it,  and contains all the session data. This can be used
  anywhere in the application to verify if the user is authenticated
