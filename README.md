# Worker-s-Attendance

1. Install Node.js: Make sure you have Node.js installed on your machine. You can download it from the official website: Node.js Downloads.

2. Install the required dependencies using the following command: npm install express body-parser jsonwebtoken

3. Run the application: node app.js.
You should see a message indicating that the server is running on a specific port (e.g., 3000).

4. Now, you can test the API using tools like or by making HTTP requests using your preferred method.
- To test the login endpoint, send a POST request to http://localhost:3000/login with a JSON body containing a username and password.
- To test the protected endpoint, include the received token in the Authorization header and send a GET request to http://localhost:3000/protected.
- To test clock in and clock out endpoints, include the received token in the Authorization header and send POST requests to http://localhost:3000/clockin and http://localhost:3000/clockout with IP, latitude, and longitude data in the request body.
- to get attendance record, include the received token in the Authorization header and send GET requests to http://localhost:3000/attendance
