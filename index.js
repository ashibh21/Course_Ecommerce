const express = require("express");
const bodyparser = require("body-parser");
const app = express();




const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
