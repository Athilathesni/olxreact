import userSchema from "./model/user.js"
import nodemailer from "nodemailer"

import bcrypt from "bcrypt"
import pkg from "jsonwebtoken"
const { sign } = pkg

const transporter = nodemailer.createTransport({
  service:"gmail",
  // host: "sandbox.smtp.mailtrap.io",
  // port:2525 ,
  // secure: false,
  auth: {
  //   user: "usmnchusman606@gmail.com",
  //   pass: "kobm upne reiz mryv",
  user:"usmanchusman606@gmail.com",
  pass:"kobm upne reiz mryv"
},
})



export async function verifyEmail(req, res) {
  const {email}=req.body
  // console.log(email);
  if (!(email))  {
      return res.status(404).send({msg:"fields are empty"})
  }
  const user= await userSchema.findOne({email})        
  if (!(user)){
      const info = await transporter.sendMail({
          from: 'usmanchusman606@gmail.com', // sender address
          to: email, // list of receivers
          subject: "email", // Subject line
          text: "VERIFY! your email", // plain text body
          html: `
          <div style="height: 200px; width: 200px; margin-left: 500px; margin-top: 250px;" >
      <div style="width: 400px; height: 150px; border:none; background-color: rgb(248, 247, 247); border-radius: 3px; box-shadow:0 0 2px 2px rgb(199, 197, 197); ">
          <h3 style="color: rgb(146, 57, 16); font-weight: bold; font-size: 25px; margin-top: 10px; margin-left: 110px;">Email Validation</h3>
          <input type="text" name="email" id="email" placeholder="enter email" style="width: 250px; height: 30px; margin-top: 40px; margin-left: 20px;">
           <a href="http://localhost:5173/signup">
          <button style="height:40px; width: 90px; color: white; background-color: seagreen; border: none; border-radius: 4px; font-weight: bold;">Verify</button>
          </a>
      </div>
  </div>
  `,
  })
  console.log("Message sent: %s", info.messageId)
  res.status(200).send({ msg: "Verificaton email sented" })
} else {
  return res.status(404).send({ msg: "email exist" })
}
}


export async function adduser(req, res) {
    const {username, email, pwd, cpwd } = req.body
    const user = await userSchema.findOne({ email })
    if (!user) {
      if (!(username && email && pwd && cpwd))
        return res.status(500).send({ msg: "fields are empty" })
      if (pwd != cpwd) return res.status(500).send({ msg: "pass not match" })
      bcrypt
        .hash(pwd, 10)
        .then((hpwd) => {
          userSchema.create({username, email, pass: hpwd })
          res.status(201).send({ msg: "Successfull" })
        })
        .catch((error) => {
          console.log(error)
        });
    } else {
      res.status(404).send({ msg: "email already used " })
    }
  }

  export async function login(req, res) {
    const { email, pass } = req.body
    if (!(email && pass))
      return res.status(404).send({ msg: "fields are empty" })
    const user = await userSchema.findOne({ email })
    if (!user) return res.status(500).send({ msg: "email donot exist" })
    const success = await bcrypt.compare(pass, user.pass)
    if (success !== true)
      return res.status(404).send({ msg: "email or password not exist" })
    const token = await sign({ UserID: user._id }, process.env.jwt_key, {expiresIn: "24h",})
    res.status(201).send({ token })
  }

  // export async function getuser(req, res) {
  //   const usr = await userSchema.findOne({ _id: req.user.UserID })
  //   res.status(200).send({ name: usr.username })
  // }