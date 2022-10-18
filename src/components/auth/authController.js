const { application } = require("express");
const jwt = require("jsonwebtoken");
const dbConn = require("../../config/db.config");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    let response = {
      status: 401,
      message: "params are required",
    };
    return res.json(response);
  }
  if (password.length < 6) {
    let response = {
      status: 401,
      message: "Password should contain minimum 6 chracter",
    };
    return res.json(response);
  }
  var emailValidation =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(emailValidation)) {
    let response = {
      message: "Please input a valid email",
      status: 401,
    };
    return res.json(response);
  }
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = await bcrypt.hashSync(req.body.password, salt);

  var findsql = "SELECT * FROM users WHERE email = ?";
  var sql = "INSERT INTO users SET ?";

  let data = {
    id: uuidv4(),
    email: email,
    password: hashPassword,
  };
  try {
    await dbConn.query(findsql, email, async (err, findData) => {
      if (err) throw err;
      if (findData.length < 1 || findData == undefined) {
        dbConn.query(sql, data, function (err, result) {
          if (err) throw err;

          var token = jwt.sign(data, process.env.privateKey);

          let response = {
            status: 200,
            message: "Successfully registered",
            data,
            token,
          };
          return res.json(response);
        });
        return;
      } else {
        let response = {
          message: "Email already exist",
          code: 401,
        };
        res.json(response);
      }
    });
  } catch (error) {
    let response = {
      status: 400,
      message: error,
    };
    res.json(response);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    let response = {
      status: 401,
      message: "params are required",
    };
    return res.json(response);
  }
  var emailValidation =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(emailValidation)) {
    let response = {
      message: "Please input a valid email",
      status: 401,
    };
    return res.json(response);
  }
  var findsql = "SELECT * FROM users WHERE email = ?";
  try {
    await dbConn.query(findsql, email, async (err, findData) => {
      if (err) throw err;
      if (findData.length < 1 || findData == undefined) {
        let response = {
          message: "Email not found",
          status: 400,
        };
        res.json(response);
      }
      let user = findData[0];
      let passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        let result = {
          status: 401,
          message: "Password is not correct",
        };
        return res.json(result);
      }
      var token = jwt.sign(
        {
          email: user.email,
          id: user.id,
        },
        process.env.privateKey
      );
      let response = {
        status: 200,
        message: "successfully login",
        token,
        data: user,
      };
      res.json(response);
    });
  } catch (error) {
    let response = {
      status: 401,
      message: error,
    };
    res.json(response);
  }
};

const isUser = async (req, res) => {
  var findsql = "SELECT * FROM users WHERE id = ?";

  try {
    var token = req.body.token;

    if (!token) {
      let responseData = {
        status: 200,
        message: "token not found",
      };
      return res.json(responseData);
    }
    var validToken = await jwt.verify(token, process.env.privateKey);
    await dbConn.query(findsql, validToken.id, async (err, findData) => {
      if (err) throw err;
      var user = findData[0];
      if (user) {
        let response = {
          status: 400,
          message: "successfully login",
          token: token,
          data: user,
        };
        res.json(response);
      } else {
        let response = {
          status: 201,
          message: "User not found",
        };
        res.json(response);
      }
    });
  } catch (error) {
    let response = {
      status: 201,
      message: error,
    };
    res.json(response);
  }
};

module.exports = {
  signup,
  login,
  isUser,
};
