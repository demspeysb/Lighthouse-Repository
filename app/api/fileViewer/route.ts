import {NextResponse} from "next/server";
import { exec } from "child_process";
import path from "path";
//import express, { Request, Response } from 'express';


export async function POST(req: Request, res: Response) {
    try {
      const body = await req.text(); // Ensure request body is properly read
  
      if (!body) {
        return NextResponse.json({ error: 'Filename required' }, { status: 400 });
      }
      console.log(body)
      //await new Promise((resolve, reject) =>{
      /*  exec('py ./app/dataFiles/fetchFile.py', (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
          }
          else if (stderr) {
            console.log(`stderr: ${stderr}`);
          }
          else {
            console.log(stdout);
          }
        })*/
      //  console.log("resolve: " + resolve)
      //  console.log("reject: " + reject)
      //})
      return NextResponse.json({ message: 'Data received successfully' });
      
    } catch (error) {
      console.error('Error retrieving filename:', error);
      return NextResponse.json({ error: 'Failed to retrieve filename' }, { status: 500 });
    }
}

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

