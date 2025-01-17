This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## Downloads
### Installing Visual Studio Code
Follow this website for Windows: 
https://code.visualstudio.com/docs/setup/windows

### Installing Node.js
Follow the link to download **(We are currently using version 20.6.0)**: 
https://nodejs.org/en/download

### Installing Next.js
Follow instructions listed here: 
https://nextjs.org/docs/getting-started/installation

## Set Up
### Cloning the Lighthouse-Repository Project
1. Go to the repository page on GitHub.
2. Click the "<> Code" button at the top right of the screen.
3. Copy the link.
4. Open a new window in VS Code.
5. Click "Clone Git Repository" and paste the link at the top.
6. Select the file location for the repository.
7. After installing Node.js at https://nodejs.org/en/download, type this command in the VSCode terminal to install the required dependancies:
     ```sh
     npm install
     ```

**Use this command to run the code on localhost:3000 and display it as a website**
   ```sh
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**These commands can be used to create a new next.js project, which can be helpful for testing features and learning the enviorment:**
1. We entered this command into the terminal:
   ```sh
   npx create-next-app@latest
   ```

2. We entered these answers when prompted to create our project:
   ```sh
   What is your project named? Lighthouse-Repository 
   Would you like to use TypeScript? Yes
   Would you like to use ESLint? Yes
   Would you like to use Tailwind CSS? Yes
   Would you like to use `src/` directory? No
   Would you like to use App Router? (recommended) Yes
   Would you like to use Turbopack for `next dev`?  No
   Would you like to customize the default import alias (@/*)? No
   ```
   
**Use this command to run the code on localhost:3000 and display it as a website**
   ```sh
   npm run dev
   ```
   
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
