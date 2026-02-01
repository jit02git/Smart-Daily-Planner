const auth = require("../Model/Auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashPassword = bcrypt.hashSync(password, 10);
  const newUser = new auth({ name, email, password: hashPassword });

  newUser
    .save()
    .then((user) =>
      res.status(201).json({ message: "User registered successfully", user })
    )
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json({ message: "Email already exists" });
      }
      res.status(500).json({ message: "Server error", error: err });
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await auth.findOne({ email });

  if (!existingUser) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Password is incorrect" });
  }

  //Now generate JWT token here
  const token = jwt.sign({ userId: existingUser._id }, "your-secret-key", {
    expiresIn: "1h",
  });

  const saveUserToken = await auth.findByIdAndUpdate(
    existingUser._id,
    { token },
    { new: true }
  );

  return res.status(200).json({ message: "Login successfull", saveUserToken });
};

module.exports = { register, login };
