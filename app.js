const express = require("express");
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});   
//in-memory database
const students = [];

//assign id to student
function generateid() {
    return students.length + 1
};

// create a student
app.post("/student", (req, res) => {
const studentData = req.body;
const student = {
    ...studentData,
    id: generateid()
};
students.push(student);
res.json(student);
});

// get all students
app.get("/all-students", (req, res) => {
    res.json(students);
});

