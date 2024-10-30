const { execFile } = require('node:child_process');

function executePython(fileName) {
    const child = execFile('python', [fileName], (error, res) => {
        if (error) {
        throw error;
        }  
        console.log(res);
        return res;
    });
}

executePython("./test.py");