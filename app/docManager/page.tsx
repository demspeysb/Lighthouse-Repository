"use client";

import Link from "next/link";
import { fileCard } from "./fileCard";
import { fileFolder } from "./fileFolder";
import "./docManager.css";
import SideNavbar from "../components/sidebar";
import Sidebar from "../components/sidebarComponent";
import { useEffect, useState } from "react";
import { buildFileStructure } from "./createFileStructure";
import { HiDocumentSearch } from "react-icons/hi";
import { FaFolderClosed } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";

// Sample file and folder structure
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
  "tornado/tornadoCsvInJson.txt",
];

export default function FileManager() {
  const [fileStructure, setFileStructure] = useState<fileFolder | null>(null);
  const [currentFolder, setCurrentFolder] = useState<fileFolder | null>(null);
  const [filePath, setFilePath] = useState<string[]>(["Documents"]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Build the file structure when the component mounts
    const rootStructure = buildFileStructure(bucketArray);
    setFileStructure(rootStructure);
    setCurrentFolder(rootStructure);
  }, []);

  // Function to navigate into a folder
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

  // Function to navigate to a specific folder in the breadcrumb path
  const goToFolder = (index: number) => {
    if (!fileStructure) return;
    let targetFolder: fileFolder | null = fileStructure;
    for (let i = 1; i <= index; i++) {
      const folderName = filePath[i];
      targetFolder = targetFolder.contents.find(
        (item) => "folderName" in item && item.folderName === folderName
      ) as fileFolder;
      if (!targetFolder) return;
    }
    setCurrentFolder(targetFolder);
    setFilePath(filePath.slice(0, index + 1));
  };

  // Update search query state on user input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Recursively search files and folders, including nested ones
  const searchFilesAndFolders = (folder: fileFolder): (fileFolder | fileCard)[] => {
    let results: (fileFolder | fileCard)[] = [];
    for (const item of folder.contents) {
      if ("folderName" in item && item.folderName.toLowerCase().includes(searchQuery)) {
        results.push(item);
      }
      if ("filename" in item && item.filename.toLowerCase().includes(searchQuery)) {
        results.push(item);
      }
      if ("contents" in item) {
        results = results.concat(searchFilesAndFolders(item));
      }
    }
    return results;
  };

  // Determine whether to show search results or the current folder contents
  const filteredContents = searchQuery && fileStructure ? searchFilesAndFolders(fileStructure) : currentFolder?.contents;

  return (
    <main>
        <div className="docManager">
          
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <span className="search-icon"><HiDocumentSearch /></span> {/* Icon placed before input */}
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-button"></button>
          </form>


            {/* Breadcrumb Navigation */}
            <div className="filePath doc-flex-item">
              {filePath.map((folder, index) => (
                <span key={index}>
                  {index > 0 && " > "}
                  <button className="breadcrumb" onClick={() => goToFolder(index)}>
                    {folder}
                  </button>
                </span>
              ))}
            </div>

            {/* Folder Display */}
            {filteredContents?.some((item) => "folderName" in item) && (
              <div className="folderContainer doc-flex-item">
                <h2>Folders</h2>
                {filteredContents
                  .filter((item) => "folderName" in item)
                  .map((folder) => (
                    <div
                      className="card"
                      key={(folder as fileFolder).folderName}
                      onClick={() => openFolder((folder as fileFolder).folderName)}
                    >
                      <span>
                        <FaFolderClosed className="inline w-5 h-5 mr-4 mb-1" />
                        {(folder as fileFolder).folderName}
                      </span>
                    </div>
                  ))}
              </div>
            )}

            {/* File Display */}
            <div className="fileContainer doc-flex-item">
              <h2>Files</h2>
              {filteredContents
                ?.filter((item) => "filename" in item)
                .map((file) => (
                  <div className="card" key={(file as fileCard).filename}>
                    <Link
                      href={{
                        pathname: "/pdfViewer",
                        query: { filename: (file as fileCard).filename },
                      }}
                      onClick={() =>
                        console.log("Opening file:", (file as fileCard).filename)
                      }
                    >
                    {(file as fileCard).filename}
                    </Link>
                  </div>
                ))}
            </div>
        </div>
    </main>
  );
}
