import { User } from "../model/user.model.js";
import { generateJwtTokenAndSetCookies } from "../utils/generateTokenAndSetCookie.js";

const userSignUp = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error(`All fileds are required`);
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // hash the password
    const hashedPassword = await bcrypt.has(password, 10); // here this number is salt
    const verificationToken = Math.floor(
      10000 + Math.random() * 90000
    ).toString();
    // create a new user in the database
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    await user.save(); // save to the database

    // generate a new jwt token and set this to the cookie
    generateJwtTokenAndSetCookies(res, user._id);

    // send back response to the server
    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "something went wrong!!",
    });
  }
};

export const userController = {
  userSignUp,
};
