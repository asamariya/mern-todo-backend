const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    // validation
    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: 'Not all fields have been entered.' });
    }

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: 'Password needs to be at least 6 characters long.' });

    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: 'Enter the same password twice for verification.' });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: 'An account with this email already exists.' });

    if (!displayName) displayName = email;

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
      displayName,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: 'Not all fields have been entered.' });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: 'No account with this email has been registered.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: { id: user._id, displayName: user.displayName, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deleteUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const checkToken = async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);

    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedUser) return res.json(false);

    const user = await User.findById(verifiedUser.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.register = register;
exports.login = login;
exports.deleteUser = deleteUser;
exports.checkToken = checkToken;
