import {NextResponse} from "next/server";
import { execFile, exec } from "child_process";
import { spawn } from 'child_process';
import path from "path";
//import express, { Request, Response } from 'express';


export async function POST(req: Request, res: Response) {
    try {
      const body = await req.text(); // Ensure request body is properly read
      const scriptPath = path.join(process.cwd(), "", "./app/api/fileViewer/generateURL.py");


      if (!body) {
        return NextResponse.json({ error: 'Filename required' }, { status: 400 });
      }
      console.log("body: " + body);
      /*try{
        const result = await spawn("python",
            ["-c", `import ${scriptPath}; ${scriptPath}.get_auth_url(${body}, "client_001"`]
        )
        //result.stdout.pipe(process.stdout);
        console.log(result.stdout)
      }catch(error){
        console.log(error)
      }*/
     /*
        console.log(`py ${scriptPath} get_auth_url client_001 ${body}`)
        return await new Promise((resolve) => {
            exec(`py "${scriptPath}" get_auth_url client_001 "${body}"`, (error, stdout, stderr) => {
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
        });*/
        return await new Promise((resolve) => {
            exec(`py ./app/api/fileViewer/cmdLineExperiment.py --bucket "client_001" --blob "`+ body + `" --expirationMins 5`, (error, stdout, stderr) => {
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
        

    return NextResponse.json({ message: 'Data received successfully' });
      
    } catch (error) {
      console.error('Error retrieving filename:', error);
      return NextResponse.json({ error: 'Failed to retrieve filename' }, { status: 500 });
    }
}

export async function GET(req: Request, res: Response) {
    try {
        console.log("Running Python script...");

        const scriptPath = path.join(process.cwd(), "", "app/api/fileViewer/listFiles.py"); // Update path accordingly

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

