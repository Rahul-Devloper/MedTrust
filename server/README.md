# SaaS Server

## Middlewares

- BodyParser: Populates the values in the `req.body` object
- Compression: The data exchanged between the server and client is compressed, to save network bandwidth
            and decrease latency
- CookieParser: It looks at the cookie header, we can access it by `req.cookie.key`
- Morgan: HTTP request logger middleware for node.js
- Passport: Authentication middleware for Node.js

## Environment Variables

- PORT=8000
- ATLAS_URI="YOUR_MONGO_URI"
- CORS_ORIGIN="http://localhost:3000" | "YOUR_ORIGIN"
- SESSION_SECRET="YOUR_SESSION_SECRET" <--- Generate a random crypt
- JWT_SECRET_KEY="YOUR_JWT_SECRET_KEY" <--- Generate a random crypt (NOTE: Tokens can be brute forced if you use weak secrets)
- JWT_EMAIL_SECRET="RANDOM_EMAIL_SECRET" <---- used for verifying emails
- NODEMAILER_EMAIL="YOUR_EMAIL_TO_SEND_VERIFICATION_FROM" <---- If gmail, provide permission `https://myaccount.google.com/lesssecureapps`
- NODEMAILER_PASSWORD="YOUR_EMAIL_PASSWORD

TIP: To generate a random crypt run the following: `require('crypto').randomBytes(64).toString('hex');`

## Know more

- Once the user is Authenticated, the user is stored in the `req.user`. The req object you get from the
  client, now has a user object inside of it,  and contains all the session data. This can be used
  anywhere in the application to verify if the user is authenticated
- Serialize user takes the entire user object we get from the auth method and stores it in the session,
  the deserialize user takes the entire user object from the session and attaches it to the `req.user`
  object.
