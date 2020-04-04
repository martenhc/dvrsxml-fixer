const fs = require('fs');
const dirName = './xml/';
const updatedDirName = `${dirName}updated/`;

module.exports = {
    readAndUpdateXMLFiles: (onFileContent, delta, sign, onError) => {
        fs.readdir(dirName, (err, filenames) => {
            if (err) {
                onError(err);
                return;
            }
            filenames.forEach((filename) => {
                if (!filename.match(/.*\.xml$/)) return;
                
                fs.readFile(`${dirName}${filename}`, 'utf-8', (err, content) => {
                    if (err) {
                        onError(err);
                        return;
                    }
                    onFileContent(filename, delta, sign, content);
                });
            });
        });
    },
    saveXMLFile: (xmlObject, filename) => {
        if (!fs.existsSync(updatedDirName)){
            fs.mkdirSync(updatedDirName);
        }

        try {
            fs.writeFileSync(`${updatedDirName}${filename}`, xmlObject)
        } catch(error) {
            console.log(`Error while generating the updated version of ${filename}.
            ${error}`);
        }

        console.log(`${filename} has been successfully updated.`)
    }
}
