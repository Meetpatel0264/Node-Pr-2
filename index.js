const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;

let students = [];

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Home Page
app.get("/", (req, res) => {
  res.render("home");
});

// Add Student Page
app.get("/add-student", (req, res) => {
  res.render("addStudent");
});

// Save Student
app.post("/save-student", (req, res) => {

  const student = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    course: req.body.course,
    phone: req.body.phone,
  };

  students.push(student);

  res.redirect("/students");
});

// Students List
app.get("/students", (req, res) => {
  res.render("students", { students });
});

// Delete Student
app.get("/delete/:id", (req, res) => {

  const id = Number(req.params.id);

  students = students.filter(student => student.id !== id);

  res.redirect("/students");
});

// Edit Student Page
app.get("/edit/:id", (req, res) => {

  const id = Number(req.params.id);

  const student = students.find(student => student.id === id);

  res.render("editStudent", { student });
});

app.get("/view/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    res.render("viewStudent", { student });
});

// Update Student
app.post("/update/:id", (req, res) => {

  const id = Number(req.params.id);

  students = students.map(student => {

    if (student.id === id) {
      return {
        ...student,
        name: req.body.name,
        email: req.body.email,
        course: req.body.course,
        phone: req.body.phone,
      };
    }

    return student;
  });

  res.redirect("/students");
});

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});