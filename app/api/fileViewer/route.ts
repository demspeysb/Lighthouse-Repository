import {NextResponse} from "next/server";
import { exec } from "child_process";
import path from "path";
import express, { Request, Response } from 'express';

const cors = require('cors');
//const express = require('express');
const app = express();
const port = 3001;

// Middleware to parse JSON request body
app.use(express.json());

//Enable cors
app.use(cors({
    methods:['GET', 'POST'],
    origin: 'http://localhost:3000', // Allow only this origin
}));


// Endpoint to receive the data
app.post('/api/fileViewer', (req: Request, res: Response) => {
  console.log('Received data:', req.body);
  
  // Respond with a success message or any relevant response
  res.json({ message: 'Data received successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});






export async function GET(req: Request, res: Response) {
    try {
        console.log("Running Python script...");

        const scriptPath = path.join(process.cwd(), "", "app/dataFiles/fetchFile.py"); // Update path accordingly

        return new Promise((resolve) => {
            exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
                if (error) {
                    console.error("Error executing Python script:", error);
                    resolve(NextResponse.json({ error: "Python script execution failed" }, { status: 500 }));
                    return;
                }
                if (stderr) {
                    console.error("Python script stderr:", stderr);
                }

                console.log("Python script output:", stdout);
                resolve(NextResponse.json({ message: "Python script executed", output: stdout }));
            });
        });
    }catch (err) {
        console.error("Server error:", err);
        return NextResponse.json({ message: "Server Error", error: err }, { status: 500 });
    }
}


// const app = express();
// app.use(cors()); // Enable CORS if frontend and backend run on different domains
// app.use(express.json()); // Parse JSON request body

// app.post("/api/send-string", (req, res) => {
//     const receivedString = req.body.data;
//     console.log("Received string:", receivedString);

//     res.json({ message: "String received successfully", receivedString });
// });

// const PORT = 5000;
// app.listen(5000, () => console.log(`Server running on port ${PORT}`));
