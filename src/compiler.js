import { execFile } from "child_process";
import path from "path";
import os from "os";
import { checkForUpdates } from "./updater.js";

const platform = os.platform();
const goCompilerBinary =
  platform === "win32"
    ? "bin/xpiler-windows.exe"
    : platform === "darwin"
    ? "bin/xpiler-macos"
    : "bin/xpiler-linux";

const goCompilerPath = path.join(__dirname, "..", goCompilerBinary);

async function ensureLatestBinary() {
    await checkForUpdates(goCompilerPath, platform);
}

export async function compileProject(file, output) {
    await ensureLatestBinary();

  return new Promise((resolve, reject) => {
    execFile(goCompilerPath, [file, "--output", output], (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Compilation failed:", stderr);
        return reject(error);
      }
      console.log(stdout);
      resolve();
    });
  });
}
