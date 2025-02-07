"use client";

import Link from "next/link";
import { fileCard } from "./fileCard"
import { fileFolder } from "./fileFolder"
import './docManager.css';
import SideNavbar from "../components/sidebar";
import { useEffect , useState } from 'react';
import { buildFileStructure } from '../docManager/createFileStrucutre'

const bucketArray: string[] = [
  "1955-2023_hail.csv",
  "MO_Long_Term_Care_Facilities.geojson",
  "MO_Primary_Care_Providers.csv",
  "MO_Public_Drinking_Water_Districts.geojson",
  "MO_Rural_Health_Clinics.csv",
  "MO_Townships_Boundaries.geojson",
  "fire_data/_variable_descriptions.csv",
  "fire_data/data.csv",
  "testfolder/",
  "testfolder/testNestedFolder/",
  "testfolder/testNestedFolder/Example.txt",
  "testfolder/testdocviewer.docx",
  "tornado/",
  "tornado/1950-2023_actual_tornadoes.csv",
  "tornado/tornadoCsvInJson.txt"
];

export default function FileManager() {
  const [fileStructure, setFileStructure] = useState<fileFolder | null>(null);
  const [currentFolder, setCurrentFolder] = useState<fileFolder | null>(null);
  const [filePath, setFilePath] = useState<string[]>(["Documents"]);

  useEffect(() => {
    const rootStructure = buildFileStructure(bucketArray);
    setFileStructure(rootStructure);
    setCurrentFolder(rootStructure); // Start at root
  }, []);

  // Navigate into a folder
  const openFolder = (folderName: string) => {
    if (!fileStructure || !currentFolder) return;

    const newFolder = currentFolder.contents.find(
      (item) => "folderName" in item && item.folderName === folderName
    ) as fileFolder;

    if (newFolder) {
      setCurrentFolder(newFolder);
      setFilePath((prev) => [...prev, folderName]);
    }
  };

  // Navigate to a specific folder in the breadcrumb path
  const goToFolder = (index: number) => {
    if (!fileStructure) return;

    let targetFolder: fileFolder | null = fileStructure;
    for (let i = 1; i <= index; i++) {
      const folderName = filePath[i];
      targetFolder = targetFolder.contents.find(
        (item) => "folderName" in item && item.folderName === folderName
      ) as fileFolder;

      if (!targetFolder) return; // Safety check
    }

    setCurrentFolder(targetFolder);
    setFilePath(filePath.slice(0, index + 1));
  };

  return (
    <div>
      <h1 className="docHeader">My Documents</h1>

      <main>
        <form className="search-form">
          <input type="search" placeholder="Search" className="search-input" />
          <button type="submit" className="search-button"></button>
        </form>

        {/* Breadcrumb Navigation */}
        <div className="filePath">
          {filePath.map((folder, index) => (
            <span key={index}>
              {index > 0 && " > "}
              <button className="breadcrumb" onClick={() => goToFolder(index)}>
                {folder}
              </button>
            </span>
          ))}
        </div>

        {/* Folder Tiles - Only show if there are subfolders */}
        {currentFolder?.contents.some((item) => "folderName" in item) && (
          <div className="folderContainer">
            <h2>Folders</h2>
            {currentFolder.contents
              .filter((item) => "folderName" in item) // Only folders
              .map((folder) => (
                <div className="card" key={(folder as fileFolder).folderName}
                  onClick={() => openFolder((folder as fileFolder).folderName)}
                >
                  {(folder as fileFolder).folderName}
                </div>
              ))}
          </div>
        )}

        {/* File Tiles */}
        <div className="fileContainer">
          <h2>Files</h2>
          {currentFolder?.contents
            .filter((item) => "filename" in item) // Only files
            .map((file) => (
              <div className="card" key={(file as fileCard).filename}>
                <Link href="/pdfViewer" onClick={() => console.log("Opening file:", (file as fileCard).filename)}>
                  {(file as fileCard).filename}
                </Link>
              </div>
            ))}
        </div>
      </main>

      <SideNavbar />
    </div>
  );
}