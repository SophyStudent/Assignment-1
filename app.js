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
    return students.length + 1 //return the length of the students array + 1 as the id
};

// create a student
app.post("/student", (req, res) => {
const studentData = req.body; //get the student data from the request body
const student = {
    ...studentData, //spread operator to update the student data
    id: generateid() //call the generateid function to assign an id to the student
};
students.push(student); //push the student to the students array
res.json(student); //return the student data as a response
});

// get all students
app.get("/all-students", (req, res) => {
    res.json(students);
});

//get one student by id
app.get("/student/:id", (req, res) => {
const id = Number(req.params.id);
const foundstudent = students.find(getstudent => getstudent.id === id);
res.json(foundstudent);
})
