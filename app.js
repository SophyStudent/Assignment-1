const express = require("express");
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});   
//in-memory database
const students = [];

//assign id to student
let nextId= 1;
function generateId() {
    return nextId++; //return the length of the students array + 1 as the id
}

// create a student
app.post("/student", (req, res) => {
const studentData = req.body; //get the student data from the request body
// single object entry
// const student = {
//     ...studentData, //spread operator to update the student data
//     id: generateid() //call the generateid function to assign an id to the student
// };

 // Check 1: body must be an array
  if (!Array.isArray(studentData)) {
    return res.status(400).json("Request body must be an array");
  }

  // Check 2: every student must have the required fields
  if (!studentData.every(student =>
    student.Name && 
    student.Age && 
    student.Dept && 
    typeof student.Age === "number" && 
    student.Age >= 0 &&
    typeof student.Name === "string" &&
    typeof student.Dept === "string" &&
    student.Name.length >= 2 && student.Dept.length >= 2
  )) {
    return res.status(400).json("Invalid student data");
  }

//bulk object entry
const newStudents = studentData.map(newstudent => ({
    ...newstudent,
    id: generateId()
}));

students.push(...newStudents); //push the new students to the students array
res.status(201).json(newStudents); //return the student data as a response
});


// get all students
app.get("/all-students", (req, res) => {
    res.json(students);
});

//get one student by id
app.get("/student/:id", (req, res) => {
const id = Number(req.params.id);
if (Number.isNaN(id)) {
return res.status(400).json("invalid student id");
}
const foundstudent = students.find(getstudent => getstudent.id === id);
if (foundstudent === undefined){
return res.status(404).json("student not found");
}

res.json(foundstudent);
})
