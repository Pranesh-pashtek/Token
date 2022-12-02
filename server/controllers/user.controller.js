const User = require('../models/user.model');
const env = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');



exports.signUp = async (req, res) => {
    var minm = 10000;
    var maxm = 99999;
    var data = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    let userData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      verification_code: data,
      status: 0
    };
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  
    User.findOne({
      attributes: ["id", "email", "password", "name", "phone","status", "verification_code"],
      where: {
        email: userData.email,
      },
    })
      .then((userExists) => {
        if (!userExists) {
          const password = bcrypt.hashSync(userData.password, 10);
          userData.password = password;
  
          console.log('userData', userData)
  
          User.create(userData)
            .then((user) => {
              if (req.body.sendBy == 'email') {
                const mailOptions = {
                  from: process.env.EMAIL,
                  to: userData.email,
                  subject: 'Your verification code...',
                  text: "I collekt verification code is :" + data,
                  html: ``
                };
  
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    return console.log(error);
                  }
                  return res.json({
                    message: "A verification link has been sent to your email",
                  });
                });
                if (user.id) {
                  sendadminnotification(user.id);
                }
                return res.send({
                  result: false,
                  message: "Signup successfully",
                  user_data: user
                });
              } else {
                // const response = fast2sms.sendMessage({ authorization: process.env.API_KEY, message: `i collekt verification code is : ${data}`, numbers: [userData.phone] });
                // res.send(response);
                return res.send({
                  result: false,
                  message: "Signup successfully",
                  user_data: user
                });
              }
            })
            .catch((err) => {
              return res
                .status(200)
                .send("Failed to register the user. Please try again");
            });
        } else {
          return res.status(200).send({
            result: true,
            message: "User already exists",
            user_data: {}
          });
        }
      })
      .catch((err) => {
        return res.status(200).send("Message:" + err);
      });
  };
  
  
  function sendadminnotification(id) {
    // console.log("userid2: ",id);
  
    const request = require('request');
    const options = {
      url: process.env.ADMIN_URL + '/api/v2/auth/signup',
      json: true,
      body: {
        id: id
      }
    };
  
    request.post(options, (err, res, body) => {
      if (err) {
        return console.log(err);
      } else {
        console.log(`Status: ${res.statusCode}`);
        console.log(body);
        return true;
      }
    });
  }
  


  exports.signIn = async (req, res) => {
    let { email, password } = req.body
  
    User.findOne({
      attributes: ["id", "email", "password", "name", "phone", "status", "verification_code"],
      where: {
        email: email, status: 1
      }
    }).then(user => {
        console.log(user,"kokokokoko");
      if (!user) {
        res.status(200).json({
          result: true,
          message: "please verify your email.",
          user_data: {}
        });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({ user: user }, process.env.AUTH_SECRET,
            // {
            //   expiresIn:"1d"
            // }
          );
          res.cookie('token', token, {
            secure: false,
            httpOnly: true,
          });
          res.json({
            result: false,
            message: "Login Successfully",
            user_data: user,
            token: token
          });
        } else {
          res.status(200).json({
            result: true,
            message: "Password is incorrect",
            user_data: {}
          });
        }
      }
    })
  
  };

// token generator
  exports.Token = async (req, res) => {
      var token = jwt.sign({ data: req.params.data }, process.env.AUTH_SECRET,)
    res.json({token: token});
  }