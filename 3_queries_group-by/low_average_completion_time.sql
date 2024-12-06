WITH avg_estimated_time AS (
    SELECT AVG(duration) AS avg_duration
    FROM assignments
)
SELECT students.name AS student, 
       AVG(assignment_submissions.duration) AS average_assignment_duration,
       avg_estimated_time.avg_duration AS average_estimated_duration
FROM students
JOIN assignment_submissions ON students.id = assignment_submissions.student_id
JOIN avg_estimated_time ON true
WHERE students.end_date IS NULL
GROUP BY students.name, avg_estimated_time.avg_duration
HAVING AVG(assignment_submissions.duration) < avg_estimated_time.avg_duration
ORDER BY average_assignment_duration;