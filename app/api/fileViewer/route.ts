import {NextResponse} from "next/server";
import { /*execFile,*/ exec } from "child_process";
//import { spawn } from 'child_process';
import path from "path";
//import express, { Request, Response } from 'express';

//Post route for fileViewer
//Takes a filename
export async function POST(req: Request, res: Response): Promise<Response> {
    try {
      const body = await req.text(); // Ensure request body is properly read
      const scriptPath = path.join(process.cwd(), "", "./app/api/fileViewer/generateURL.py");

    //If no fileName was passed
      if (!body) {
        return NextResponse.json({ error: 'Filename required' }, { status: 400 });
      }
    //otherwise log the filename
      console.log("body: " + body);

        return await new Promise((resolve) => {
            //Creating a url for a file defined by body
            //Passes arguments via the cmd line arguments are --variable [value]
            exec(`python ./app/api/fileViewer/cmdLineExperiment.py --bucket "client_001" --blob "`+ body + `" --expirationMins 5`, (error, stdout, stderr) => {
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
        

    //return NextResponse.json({ message: 'Data received successfully' });

    //if an error occurs log it
    } catch (error) {
      console.error('Error retrieving filename:', error);
      return NextResponse.json({ error: 'Failed to retrieve filename' }, { status: 500 });
    }
}

//GET route for fileViewer
//This route is used on startup of the fileViewer
//Retrieves filenames to build the viewer
export async function GET(req: Request, res: Response): Promise<Response> {
    try {
        console.log("Running Python script...");

        const scriptPath = path.join(process.cwd(), "", "app/api/fileViewer/listFiles.py"); // Update path accordingly
        //Run a function to list files in the bucket
        return new Promise((resolve) => {
            exec(`python "${scriptPath}" --bucket "client_001"`, (error, stdout, stderr) => {
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

