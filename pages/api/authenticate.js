const jwt = require("jsonwebtoken");
const serverRuntimeConfig = process.env.TOKEN;

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      return authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function authenticate() {
    const { email } = req.body;

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: email }, serverRuntimeConfig, {
      expiresIn: "7d",
    });

    // return basic user details and token
    return res.status(200).json({
      email: email,
      token,
    });
  }
}
