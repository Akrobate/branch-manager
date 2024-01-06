'use strict';


const {
    expect,
} = require('chai');

const {
    configuration,
} = require('../../src/configuration');


describe('Configuration unit test', () => {

    it('Should be able to get Application port', () => {
        expect(configuration.server.port).to.equal(3000);
    });
});
