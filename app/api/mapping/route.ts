import {NextResponse} from "next/server";
import { execFile, exec } from "child_process";
import { spawn } from 'child_process';
import path from "path";
import fs from 'fs'
//import express, { Request, Response } from 'express';

//Post route that writes arcGIS data to a file
export async function POST(req: Request, res: Response) {
    try {
      const body = await req.text(); // Ensure request body is properly read


      if (!body) {
        return NextResponse.json({ error: 'Filename required' }, { status: 400 });
      }
      console.log("body: " + body);
       await fetchEsriDataToOutputFile(body, './app/api/mapping/GISDataLayer01.json')

    return NextResponse.json({ message: 'Data received successfully' });
      
    } catch (error) {
      console.error('Error retrieving filename:', error);
      return NextResponse.json({ error: 'Failed to retrieve filename' }, { status: 500 });
    }
}

//
async function fetchEsriDataToOutputFile(url: string, outputFile: string) {
    try {
        const response = await fetch(`${url}/query?where=1=1&outFields=*&outSR=4326&f=geojson`);
        const data = await response.json();

        // // Write data to a JSON file
        await fs.writeFile(outputFile, JSON.stringify(data, null, 2), (err)=>{
            if (err) {
                console.error('Error writing file:', err);
              } else {
                console.log('File written successfully!');
              }
        });
        console.log(`Data successfully written to ${outputFile}`);
    } catch (error) {
       console.error("Error fetching ArcGIS data:", error);
    }
}


