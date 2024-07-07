const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ashibh21:MHG0WozQoAdnN80x@cluster0.pxjwtch.mongodb.net/course_selling_app"
);

const AdminSchema = new mongoose.Schema({
  username: "String",
  password: "String",
});
const UserSchema = new mongoose.Schema({
  username: "String",
  password: "String",
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});


const CourseSchema = new mongoose.Schema({
  title: "String",
  discription: "String",
  imageLink: "String",
  price: Number,
});
// const Schema = new mongoose.Schema({});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
