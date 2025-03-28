#!/usr/bin/env node
import { compileProject } from "./compiler.js";

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: xpiler <input.js> --output <output_binary>");
  process.exit(1);
}

const inputFile = args[0];
const outputFile = args[2];

compileProject(inputFile, outputFile)
  .then(() => console.log("🎉 Compilation Successful!"))
  .catch((err) => console.error("❌ Compilation Failed:", err));
