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
const limit = process.argv[3] || 5; // Default limit to 5 if not provided

const queryString = `
  SELECT students.id, students.name, cohorts.name AS cohort_name
  FROM students
  JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
`;

const values = [`%${cohortName}%`, limit];

pool
  .query(queryString, values)
  .then((res) => {
    res.rows.forEach((student) => {
      console.log(
        `${student.name} has an id of ${student.id} and was in the ${student.cohort_name} cohort`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));
