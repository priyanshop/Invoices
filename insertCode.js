const fs = require('fs');

const filePath = 'node_modules/react-native-vector-icons/fonts.gradle';
const insertionLine = 28;
const codeToAdd = `def lintVitalAnalyzeTask = tasks.findByName("lintVitalAnalyze${"${targetName}"}")
if (lintVitalAnalyzeTask) {
   lintVitalAnalyzeTask.dependsOn(fontCopyTask)
}`;

// Read the file content
const fileContent = fs.readFileSync(filePath, 'utf8');

// Split the content into lines
const lines = fileContent.split('\n');

// Insert the code at the specified line
lines.splice(insertionLine, 0, codeToAdd);

// Join the lines back into a single string
const updatedContent = lines.join('\n');

// Write the updated content back to the file
fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log('Code inserted successfully.');