const express = require("express");
const userRouter = require("./user");
const adminRouter = require("./admin");


const router1 = express.Router();
const router2 = express.Router();

router1.use("/user", userRouter);
router2.use("/admin", adminRouter);

module.exports = router1;
module.exports = router2;
