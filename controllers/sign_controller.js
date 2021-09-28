const mongoose = require("mongoose");

const db = require("../models");
const Register = require("../models/Registration");
const jwt = require("jsonwebtoken");

const maxAge = 2 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign({ ...user }, "secretLogin", {
    expiresIn: maxAge,
  });
};

exports.registration = (req, res) => {
  console.log("req.body.data",req.body.data);
  try {
    let data = JSON.parse(req.body.data);
    console.log("this", data);
    const register = Register(data);
    db.Registration.create(register).then((resp) => res.status(200).json(resp));
    //db.disconnect();
  } catch (e) {
    console.log(e);
  }
};

exports.signIn = (req, res) => {
  try {
    let email = JSON.parse(req.body.email);
    let password = JSON.parse(req.body.password);

    db.Registration.findOne(
      {
        $and: [{ email: { $eq: email } }, { password: { $eq: password } }],
      },
      (err, resp) => {
        if (err) {
          res.send(err);
        } else if (resp === null) {
          res.send(false);
        } else if (resp !== null) {
          const token = createToken(resp);
          let options = { maxAge: maxAge * 10000, path: "/" };
          res.status(200).json({
            user: resp,
            cookie: "jwtlogin",
            token: token,
            options: options,
          });
        } else res.send(false);
      }
    );
  } catch (e) {
    console.log("sign in failed because:", e.toString());
  }
};

exports.logout = (req, res) => {
  try {
    res.status(200).json({
      cookie: "jwtlogin",
      token: "",
      options: { maxAge: 1, path: "/" },
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getOrganizer = (req, res) => {
  try {
    let id = String(req.params.org_id);
    db.Registration.findOne({ _id: id }, (err, result) => {
      if (err) {
        res.send(err);
        console.log("Error is->", result);
      } else {
        res.status(200).json(result);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

exports.updateUserProfile = (req, res) => {
  try {
    let data = JSON.parse(req.body.data);

    db.Registration.updateOne(
      { _id: req.params.id },
      {
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
        address: data.address,
        dob: data.dob,
        postal: data.postal,
        contact: data.contact,
        country: data.country,
        updated_at: new Date(),
      }
    ).exec((err, result) => {
      if (result) {
        res.status(200).json({ result: result });
      } else if (err) {
        res.status(400).json({ error: err });
      } else res.status(400).json({ error: err });
    });
  } catch (e) {
    console.log(e);
  }
};

exports.authCheck = (req, res) => {
  try {
    const token = req.params.cookies;
    //check json web token exists & is verified
    if (token) {
      jwt.verify(token, "secretLogin", (err, decodedToken) => {
        if (err) {
          res.send({ message: "no cookie found~!" });
        } else if (decodedToken) {
          res.status(200).json(decodedToken);
        }
      });
    } else {
      res.send({ message: "Token not found~!" });
    }
  } catch (e) {
    console.log(e);
  }
};
