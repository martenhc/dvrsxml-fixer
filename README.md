## XML editor for DaVinci Resolve Studio files

### How to use

**First time only:**
1) Download Node latest stable version https://nodejs.org/en/download/
2) In the console, run "npm i" in the folder where package.json file is.
3) Delete the test.xml if you have your own files to update.

**Each time you need to update files:**
1) Put your XML file/s in the "xml" folder inside the project.
2) In the console, run "node app fix" inside the project root folder and follow the instructions.
3) The result will be in "xml/updated" folder.