const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;

let students = [];

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/add-student", (req, res) => {
  res.render("addStudent");
});

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

app.get("/students", (req, res) => {
  res.render("students", { students });
});

app.get("/delete/:id", (req, res) => {

  const id = Number(req.params.id);

  students = students.filter(student => student.id !== id);

  res.redirect("/students");
});

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