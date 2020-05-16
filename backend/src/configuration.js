
class Configuration {

    /**
     * @return {Number}
     */
    static get APP_PORT() {
        return 3000;
    }

    /**
     * @return {Number}
     */
    getAppPort() {
        return Configuration.APP_PORT;
    }

    /* istanbul ignore next */
    /**
     * @returns {Configuration}
     */
    static getInstance() {
        if (Configuration.instance === null) {
            Configuration.instance = new Configuration();
        }
        return Configuration.instance;
    }
}

Configuration.instance = null;

module.exports = {
    Configuration,
    configuration: Configuration.getInstance(),
};
