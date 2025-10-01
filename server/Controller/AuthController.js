const auth = require("../Model/Auth");

const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = new auth({ name, email, password });

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
