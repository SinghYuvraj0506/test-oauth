const express = require("express");
const {GoogleProvider} = require("oauth-wrapper-lib/providers");
const {AuthMiddleware, verifyJWT} = require("oauth-wrapper-lib/express");
const OAuthClient = require("oauth-wrapper-lib");
const cookieParser = require("cookie-parser")

const app = express();
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Wokring")
})

const google = new GoogleProvider({
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret:process.env.GOOGLE_CLIENT_SECRET,
  requestHandlerUrl:"/api/google"
});

const client = new OAuthClient({
  providers: [google],
  successRedirectUrl: "http://localhost:3000",
  errorRedirectUrl: "hello.com",
});

app.use(AuthMiddleware(client))

app.get("/me",verifyJWT,(req,res)=>{
    return res.send(req.user);
})

// check logout at /api/auth/logout
// check refresh toekn at /api/auth/refresh

app.listen(3000, () => {
  console.log("Whoooo at 3000");
});
