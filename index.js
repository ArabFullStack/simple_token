const express = require('express');
const app = express();
const port = 4000;
const jwt = require('jsonwebtoken')
app.use(express.json());
const secret = "supERduPErBIGscreen";

app.post('/sign-token', (req, res) => {    
    const payload = {
        firstNname: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id
    };
    
    const expiry = 66000   
    jwt.sign(payload, secret, {expiresIn: expiry}, (err, token) => {
        if (err) {
            return res.status(500).json({err})
        }else {
            return res.status(200).json({token})
        }
    })     
}) 

app.get('/decode-token', (req, res) => {    
   console.log(req.headers)

   const authHeader = req.headers.authorization;
   console.log(authHeader)
   if (!req.headers.authorization) {
       return res.status(403).json({messsage: "authentication token is required"})
   }
   const splittedStr = authHeader.split(' ')     
   const token = splittedStr[1];
   jwt.verify(token, secret, (err, decodedToken) => {
       if (err) {
           return res.status(500).json({err})
       }else {
           return res.status(200).json({user: decodedToken})
       }
   })     
})




app.listen(port, () => console.log('app started'));
