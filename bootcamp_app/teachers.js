const { Pool } = require("pg");

// Set up the database connection
const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

// Get command-line arguments
const cohortName = process.argv[2];

if (!cohortName) {
  console.log("Please provide a cohort name.");
  process.exit();
}

const queryString = `
  SELECT DISTINCT teachers.name AS teacher,
         cohorts.name AS cohort
  FROM assistance_requests
  JOIN teachers ON assistance_requests.teacher_id = teachers.id
  JOIN students ON assistance_requests.student_id = students.id
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name = $1
  ORDER BY teacher;
`;

const values = [cohortName];

pool
  .query(queryString, values)
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  })
  .catch((err) => console.error("query error", err.stack));