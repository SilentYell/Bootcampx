SELECT AVG(completed_at - started_at) AS average_assistance_request_duration
FROM assistance_requests
WHERE completed_at IS NOT NULL AND started_at IS NOT NULL;