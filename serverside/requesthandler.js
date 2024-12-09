import userSchema from "./model/user.js"
import nodemailer from "nodemailer"

import bcrypt from "bcrypt"
import pkg from "jsonwebtoken"
const { sign } = pkg


export async function adduser(req, res) {
    const {phone, username, email, pwd, cpwd } = req.body
    const user = await userSchema.findOne({ email })
    if (!user) {
      if (!(phone&&username && email && pwd && cpwd))
        return res.status(500).send({ msg: "fields are empty" })
      if (pwd != cpwd) return res.status(500).send({ msg: "pass not match" })
      bcrypt
        .hash(pwd, 10)
        .then((hpwd) => {
          userSchema.create({phone, username, email, pass: hpwd })
          res.status(201).send({ msg: "Successfull" })
        })
        .catch((error) => {
          console.log(error)
        });
    } else {
      res.status(500).send({ msg: "email already used " })
    }
  }

  export async function login(req, res) {
    const { email, pass } = req.body
    if (!(email && pass))
      return res.status(500).send({ msg: "fields are empty" })
    const user = await userSchema.findOne({ email })
    if (!user) return res.status(500).send({ msg: "email donot exist" })
    const success = await bcrypt.compare(pass, user.pass)
    if (success !== true)
      return res.status(500).send({ msg: "email or password not exist" })
    const token = await sign({ UserID: user._id }, process.env.jwt_key, {expiresIn: "24h",})
    res.status(201).send({ token })
  }