import dbConnect from "../../util/mongo";
import Users from "../../models/Users";
const jwt = require("jsonwebtoken");
const serverRuntimeConfig = process.env.TOKEN;

export default async function handler(req, res) {
  const { method } = req;
  const { email } = req.body;

  await dbConnect();
  const token = jwt.sign({ sub: email }, serverRuntimeConfig, {
    expiresIn: "7d",
  });

  if (method === "POST") {
    try {
      const signupUser = await Users.create(req.body);
      res.status(201).json({ email: email, token });
      console.log(signupUser);
      console.log(token);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
