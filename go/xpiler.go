package main

import (
	"fmt"
	"os"
	"os/exec"
	// "path/filepath"
)

func main() {
	if len(os.Args) < 3 {
		fmt.Println("Usage: xpiler <input.js> --output <output_binary>")
		return
	}

	inputFile := os.Args[1]
	outputFile := os.Args[3]

	// Run Node.js packaging using pkg (or any other bundler)
	cmd := exec.Command("pkg", inputFile, "--output", outputFile)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	err := cmd.Run()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("✅ Successfully compiled:", outputFile)
}
