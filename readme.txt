STUDENT CRUD API
│
├── 1. EXPRESS / SERVER SETUP
│   │
│   ├── Express
│   │   └── Creates the Express application
│   │
│   ├── app
│   │   └── The actual Express application
│   │
│   ├── Middleware
│   │   └── express.json()
│   │       └── Allows Express to read JSON request bodies
│   │
│   └── Port
│       └── 3000
│           └── Server listens for requests here
│
│
├── 2. IN-MEMORY DATABASE
│   │
│   ├── students = []
│   │   └── Stores all student objects
│   │
│   └── ID GENERATOR
│       │
│       ├── nextId = 1
│       └── generateId()
│           └── Gives each new student a unique ID
│
│
├── 3. HTTP ROUTES
│   │
│   ├── POST /students
│   │   │
│   │   ├── Purpose
│   │   │   └── Create students
│   │   │
│   │   ├── Request body
│   │   │   └── Array of student data
│   │   │
│   │   ├── Handler
│   │   │   │
│   │   │   ├── Get req.body
│   │   │   ├── Validate body is an array
│   │   │   ├── Validate each student
│   │   │   │   ├── Name
│   │   │   │   ├── Age
│   │   │   │   └── Dept
│   │   │   ├── Generate ID
│   │   │   ├── Create new student objects
│   │   │   ├── Add them to students[]
│   │   │   └── Send response
│   │   │
│   │   └── Response
│   │       └── 201 Created
│   │
│   │
│   ├── GET /student/:id
│   │   │
│   │   ├── Purpose
│   │   │   └── Get ONE student
│   │   │
│   │   ├── URL parameter
│   │   │   └── :id
│   │   │       └── Comes from the URL
│   │   │
│   │   ├── Handler
│   │   │   │
│   │   │   ├── Get req.params.id
│   │   │   ├── Convert ID to number
│   │   │   ├── Validate ID
│   │   │   │   ├── Must be a number
│   │   │   │   └── Must be > 0
│   │   │   ├── Search students[]
│   │   │   │   └── .find()
│   │   │   ├── Check if student exists
│   │   │   └── Send response
│   │   │
│   │   ├── Errors
│   │   │   ├── 400 → invalid ID
│   │   │   └── 404 → student doesn't exist
│   │   │
│   │   └── Success
│   │       └── 200 → student object
│   │
│   │
│   ├── GET /students
│   │   │
│   │   ├── Purpose
│   │   │   └── Get ALL students
│   │   │
│   │   ├── Handler
│   │   │   └── Read students[]
│   │   │
│   │   └── Response
│   │       └── 200 → array of students
│   │
│   │
│   ├── PUT /student/:id
│   │   │
│   │   ├── Purpose
│   │   │   └── Replace/update ONE student
│   │   │
│   │   ├── URL parameter
│   │   │   └── :id
│   │   │
│   │   ├── Request body
│   │   │   └── New student data
│   │   │
│   │   ├── Handler
│   │   │   │
│   │   │   ├── Get ID
│   │   │   ├── Validate ID
│   │   │   ├── Find student
│   │   │   ├── Check student exists
│   │   │   ├── Validate new data
│   │   │   ├── Update student
│   │   │   └── Send response
│   │   │
│   │   ├── Errors
│   │   │   ├── 400 → invalid ID/data
│   │   │   └── 404 → student doesn't exist
│   │   │
│   │   └── Success
│   │       └── 200 → updated student
│   │
│   │
│   └── DELETE /student/:id
│       │
│       ├── Purpose
│       │   └── Delete ONE student
│       │
│       ├── URL parameter
│       │   └── :id
│       │
│       ├── Handler
│       │   │
│       │   ├── Get ID
│       │   ├── Validate ID
│       │   ├── Find student
│       │   ├── Check student exists
│       │   ├── Remove student
│       │   └── Send response
│       │
│       ├── Errors
│       │   ├── 400 → invalid ID
│       │   └── 404 → student doesn't exist
│       │
│       └── Success
│           └── 200 or 204 → deleted
│
│
└── 4. ERROR HANDLING
    │
    ├── 400 Bad Request
    │   └── Client sent invalid data
    │
    ├── 404 Not Found
    │   └── Student does not exist
    │
    └── 500 Internal Server Error
        └── Unexpected server problem

        
        
        The whole thing in one line:
        
Express
  ↓
Middleware
  ↓
Port
  ↓
Database
  ↓
HTTP Route
  ↓
Request
  ↓
Handler
  ↓
Validation
  ↓
CRUD operation
  ↓
Error handling OR Success response

And the CRUD → HTTP method → main operation relationship is:

CREATE  → POST    → .map() + .push()
READ    → GET     → .find() / read students[]
UPDATE  → PUT     → .find() + modify object
DELETE  → DELETE  → .findIndex() + .splice()