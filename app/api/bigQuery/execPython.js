const { execFile } = require('node:child_process');

async function executePython(fileName) {
    const child = execFile('python', [fileName], async (error, res)  => {
        if (error) {
        throw error;
        }  
        console.log(res);
        return res;
    });
}
async function run(){
    await executePython("./GetTornadoData.py");
}
run()