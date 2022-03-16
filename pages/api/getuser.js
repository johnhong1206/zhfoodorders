import dbConnect from "../../util/mongo";
import Users from "../../models/Users";

const handler = async (req, res) => {
  await dbConnect();

  const { method } = req;

  if (method === "GET") {
    try {
      const UserList = await Users.find();
      res.status(200).json(UserList);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
