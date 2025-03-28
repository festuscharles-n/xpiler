import fs from "fs";
import path from "path";

export function fileExists(filePath) {
  return fs.existsSync(filePath);
}

export function getFileSize(filePath) {
  if (!fileExists(filePath)) return 0;
  const stats = fs.statSync(filePath);
  return stats.size;
}

export function getBinaryPath(platform) {
  return platform === "win32"
    ? "bin/xpiler-windows.exe"
    : platform === "darwin"
    ? "bin/xpiler-macos"
    : "bin/xpiler-linux";
}

export function getFileExtension(filePath) {
  return path.extname(filePath);
}
