'use strict';

const {
    exec,
} = require('child_process');

class CommandLineService {

    /* istanbul ignore next */
    /**
     * @return {CommandLineService}
     */
    static getInstance() {
        if (CommandLineService.instance === null) {
            CommandLineService.instance = new CommandLineService();
        }
        return CommandLineService.instance;
    }


    /**
     * @param {String} command
     * @param {String} workgind_directory
     * @return {String}
     */
    run(command, workgind_directory) {
        return new Promise(
            (resolve, reject) => exec(
                command,
                workgind_directory,
                (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return reject(error);
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return reject(new Error(stderr));
                    }
                    return resolve(stdout);
                }
            )
        );
    }

}

CommandLineService.instance = null;

module.exports = {
    CommandLineService,
};
