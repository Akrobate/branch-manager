'use strict';


const {
    expect,
} = require('chai');

const {
    Configuration,
    configuration,
} = require('../../src/configuration');


describe('Configuration unit test', () => {

    it('Should be able to get Application port', () => {
        const conf = Configuration.getInstance();
        expect(conf.getAppPort()).to.equal(3000);
    });

    it('Should be able to get Application port from conf object', () => {
        expect(configuration.getAppPort()).to.equal(3000);
    });

});
