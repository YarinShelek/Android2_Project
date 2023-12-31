const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cart = require("../../models/Cart");

// Get all users
exports.getAllUsers = (req, res) => {
  console.log("Fetch all users...");
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Get a specific user by ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// get a specific user by username
exports.getUserByUsername = (req, res) => {
  const { username } = req.query;
  if (!username) {
    res.send(404);
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // User found
      console.log(user);
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error("Error fetching user by username:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Update a user by ID (and check if he is an administrator)
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((user) => {
      if (user && user.role === "admin") {
        res.send(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// Delete a user by ID
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    console.log("Creating user");
    // Get specific data to create a new user
    const { username, password, name, address, phone, email, isAdmin } =
      req.query;
    if (!username || !password || !email || !address || !phone || !name) {
      // Verify the user
      console.log(`${username} 
      ${password}
      ${email}
      ${phone}
      ${name}
      ${address}`);
      console.log("all input is required");
      return res.status(404).send("All input is required");
    }

    // Generate a random salt
    const salt = Math.random().toString();

    // Combine the password and salt
    const saltedPassword = password + salt;

    // Hash the salted password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    console.log("Create new user");
    const user = await User.create({
      username,
      name,
      phone,
      addresses: {
        city: address,
      },
      email,
      role: isAdmin ? "admin" : "user",
      password: encryptedPassword,
      cart: {
        product: [],
      },
    });

    // Get a token from jwt
    console.log("get a token from jwt");
    const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    // Assign the token to the user
    user.token = token;
    // return the user
    res.status(200).json(user);
  } catch (error) {
    console.log(`Error: ${error}: ${error.message}`);
    res.status(500).send("Internal Server Error");
  }
};
// Handle login
exports.login = async (req, res) => {
  const { username, password } = req.query;
  console.log(`Login: ${username} ${password}`);

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    console.log(`User: ${user}`);

    if (!user) {
      // User not found
      return res.status(404).send("User not found");
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Is match: ${isMatch}`);

    if (isMatch) {
      // Passwords match, authentication successful
      res.status(200).send("Authentication successful");
    } else {
      // Passwords do not match
      res.status(401).send("Authentication failed");
    }
  } catch (err) {
    console.log(`Error: ${err}: ${err.message}`);
    res.status(500).send("Internal Server Error");
  }
};
// Handle logout
exports.logout = (req, res) => {
  // Perform any logout actions (e.g., clear session, token, etc.)
  res.status(200).send("Logged out successfully");
};

// Auth users with jwt
exports.authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("Authentication token: " + token);
  var fixedToken = token ? token.split(" ")[1] : null;
  token === process.env.TOKEN_KEY ? token : process.env.TOKEN_KEY;
  fixedToken = token;
  console.log("Authentication token fixed: " + fixedToken);

  if (!fixedToken) {
    res.status(401).send("No token provided");
  } else {
    jwt.verify(fixedToken, process.env.TOKEN_KEY, (err, decoded) => {
      console.log(err);
      console.log(jwt.decode(fixedToken));
      console.log("decoded:", decoded);
      if (err) {
        res.status(403).send("Invalid token " + "" + err + err.message);
      } else {
        // Add the decoded user data to the request object
        req.user = decoded;
        next();
      }
    });
  }
};

exports.adminAction = (req, res) => {
  // Perform admin-specific actions
  res.status(200).send("Admin action performed");
};

exports.userAction = (req, res) => {
  // Perform user-specific actions
  res.status(200).send("User action performed");
};
