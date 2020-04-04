## XML editor for DaVinci Resolve Studio files

### How to use

**One time only:**
a) Download Node latest stable version https://nodejs.org/en/download/
b) In the console, run "npm i" in the folder where package.json file is.
c) Delete the test.xml if you have your own files to update.

**Each time you need to update files:**
1) Put your XML files in the "xml" folder inside the project.
2) In the console, run "node app fix" inside the project root folder and follow the instructions.
3) The result will be in "xml/updated" folder.