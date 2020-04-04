const   { parseString, Builder } = require('xml2js'),
        { readAndUpdateXMLFiles, saveXMLFile } = require('./fileSystem');

const onFileContent = (filename, delta, sign, content) => {
    parseString(content, (err, result) => {
        if (err) return;

        console.log(`Updating ${filename}...`);

        try {
            result['DolbyLabsMDF'].Outputs.forEach((output, outputIndex) =>
                output.Output.forEach((innerOutput, innerOutputIndex) =>
                    innerOutput.Video.forEach((video, videoIndex) => 
                        video.Track.forEach((track, trackIndex) =>
                            track.Shot.forEach((shot, shotIndex) =>
                                shot.Record.forEach((record, recordIndex) =>
                                    record.In.forEach((inValue, inValueIndex) => {
                                        result['DolbyLabsMDF'].Outputs[outputIndex]
                                            .Output[innerOutputIndex].Video[videoIndex]
                                            .Track[trackIndex].Shot[shotIndex].Record[recordIndex]
                                            .In[inValueIndex] = sign === '+' ? 
                                                parseInt(inValue, 10) + parseInt(delta, 10) : 
                                                parseInt(inValue, 10) - parseInt(delta, 10);
                                    })
                                )
                            )
                        )
                    )
                )
            );
        } catch (error) {
            console.log(`There was an error updating ${filename}. 
            Skipping. 
            - Error: ${error}`)
            return;
        };
        
        saveXMLFile(new Builder().buildObject(result), filename);
    });
};

const onError = (error) => console.log(`Error while updating files: ${error}`);

module.exports = {
    fix: ({ delta, sign }) => {
        readAndUpdateXMLFiles(onFileContent, delta, sign, onError);
    }
}
