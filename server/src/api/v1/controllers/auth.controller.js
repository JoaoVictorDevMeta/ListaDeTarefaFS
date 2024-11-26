import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT } from "../../../config/constants.js";

export async function login(req, res) {
  const { email, password } = req.body;
  //validations happend before this function
  //no need validation here
  try {
    const dbUser = await User.findByEmail(email);
    if (!dbUser) {
      return res.status(404).json({ message: "Nenhum usuário encontrado" });
    }

    const match = await bcrypt.compare(password, dbUser.password);
    if (!match) {
      return res.status(401).json({ message: "Credenciais incorretas" });
    }

    const { password: _, ...validUser } = dbUser;
    const userId = dbUser.id
    const token = jwt.sign(
      { userId }, 
      JWT, 
      {expiresIn: 3600000,}
    );
    res.json({ token, validUser, auth: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Algo deu errado" });
  }
}