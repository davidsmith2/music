import { exec } from 'child_process';

export function runNodeScript(scriptPath: string, arg: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`node ${scriptPath} ${arg}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        reject(error.message);
      } else if (stderr) {
        console.error(`Script stderr: ${stderr}`);
        reject(stderr);
      } else {
        console.log(`Script stdout: ${stdout}`);
        resolve(stdout.trim());
      }
    });
  });
}