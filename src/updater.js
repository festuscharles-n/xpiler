import fs from "fs";
import https from "https";
import path from "path";

const repo = "festuscharles-n/xpiler";
const latestReleaseURL = `https://api.github.com/repos/${repo}/releases/latest`;

async function getLatestVersion() {
  return new Promise((resolve, reject) => {
    https.get(latestReleaseURL, { headers: { "User-Agent": "Xpiler" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json.tag_name);
        } catch (err) {
          reject(err);
        }
      });
    });
  });
}

async function downloadLatestBinary(outputPath, platform) {
  const fileName = platform === "win32" ? "xpiler-windows.exe" : platform === "darwin" ? "xpiler-macos" : "xpiler-linux";
  const downloadURL = `https://github.com/${repo}/releases/latest/download/${fileName}`;

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(downloadURL, (res) => {
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", reject);
  });
}

export async function checkForUpdates(binaryPath, platform) {
  try {
    const latestVersion = await getLatestVersion();
    const currentVersionFile = path.join(path.dirname(binaryPath), ".version");

    if (fs.existsSync(currentVersionFile)) {
      const currentVersion = fs.readFileSync(currentVersionFile, "utf-8").trim();
      if (currentVersion === latestVersion) return;
    }

    console.log("⬇️ Downloading latest Xpiler binary...");
    await downloadLatestBinary(binaryPath, platform);
    fs.writeFileSync(currentVersionFile, latestVersion);
    console.log("✅ Xpiler binary updated to", latestVersion);
  } catch (err) {
    console.error("⚠️ Failed to update Xpiler:", err);
  }
}
