import {NextResponse} from "next/server";
import { exec } from "child_process";
import path from "path";
import express from "express";
import cors from "cors";
//import execPython.js;
//import {dbQuery} from "../../database/databaseConnection";
//import {executePython} from "app/api/bigQuery/execPython.js";//= //require('node:child_process');

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
