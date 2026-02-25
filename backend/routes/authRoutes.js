const express = require("express");
const router = express.Router();
const { login } = require("../utils/ldapController");

router.post("/login", login);

module.exports = router;