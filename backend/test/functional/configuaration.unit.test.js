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

    it('Check necessary properties', () => {
        expect(configuration).to.have.property('server');
        expect(configuration.server).to.have.property('port');

        expect(configuration).to.have.property('storage');
        expect(configuration.storage).to.have.property('data_file_path');
    });

});
