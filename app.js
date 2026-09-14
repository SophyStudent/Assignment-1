const express = require("express");
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
//in-memory database
const students = [];

//assign id to student
let nextId = 1;
function generateId() {
  return nextId++; //return the length of the students array + 1 as the id
}


// ================================================ //
// ================================================//


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

// ================================================ //
// ================================================//


//get one student by id
app.get("/student/:id", (req, res) => {
  const id = Number(req.params.id); //Get ID from URL and convert it to a number
  if (Number.isNaN(id)) { //validate if the id is a number
    return res.status(400).json("invalid student id"); //return a 400 error if the id is not a number
  }
  if (id <= 0) {
    return res.status(400).json("invalid student id");
  }
  const foundstudent = students.find(getstudent => getstudent.id === id); //find the student with the given id
  if (foundstudent === undefined) { //validate if the student is found
    return res.status(404).json("student not found"); //return a 404 error if the student is not found
  }

  res.json(foundstudent); //return the student data as a response
})

// ================================================ //
// ================================================//

// get all students
app.get("/all-students", (req, res) => {
  const foundstudents = students; // receive and read
  res.json(foundstudents); //return all student data as array in json response
});

// ================================================ //
// ================================================//
// update a student by id
app.put("/student/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) { return res.status(400).json("invalid student id"); }
  const foundstudent = students.find(getstudent => getstudent.id === id);
  if (foundstudent === undefined) { return res.status(404).json("student not found"); }
  const newStudent = req.body;
  if (typeof newStudent.Name !== "string" || typeof newStudent.Age !== "number" || newStudent.Age < 0 || typeof newStudent.Dept !== "string") { return res.status(400).json("Invalid student data"); }
  Object.assign(foundstudent, newStudent);
  res.json(foundstudent);
});

// ================================================ //
// ================================================//
//update partial 
app.patch("/student/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) { return res.status(400).json("invalid student id"); }
  const foundstudent = students.find(getstudent => getstudent.id === id); // Think of getstudent as a temporary workspace variable used by .find().
  if (foundstudent === undefined) { return res.status(404).json("student not found"); }
  const partialStudentInfo = req.body;
  //key PATCH concept: we only validate fields that the user actually sent.
  if (partialStudentInfo.Name !== undefined && typeof partialStudentInfo.Name !== "string" || partialStudentInfo.Age !== undefined && (typeof partialStudentInfo.Age !== "number" || partialStudentInfo.Age < 0) || partialStudentInfo.Dept !== undefined && typeof partialStudentInfo.Dept !== "string") { return res.status(400).json("Invalid student data"); }
  Object.assign(foundstudent, partialStudentInfo);
  res.json(foundstudent);
});

// ================================================ //
// ================================================//
//delete a student by id
app.delete("/student/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) { return res.status(400).json("invalid student id"); }
  if (id <= 0) { return res.status(400).json("invalid student id"); }
  const studentIndex = students.findIndex(getstudent => getstudent.id === id);
  if (studentIndex === -1) { return res.status(404).json("student not found"); }
  students.splice(studentIndex, 1); // 1 means remove only one item; splice() automatically closes the index gap; but the deleted id is gone
  res.json("student deleted successfully");
});
