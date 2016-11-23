/**
 * Created by @author jonas on 2016-11-22.
 *
 * Copyright 2016 (C) jonas
 * License: MIT
 */
const assert = require('assert');
const sinon = require('sinon');
const mockery = require('mockery');
const seneca = require('seneca');

const data = require('./test-data');

const senecaOpts = {
  log: {level: 'error+'}
};

describe('telldus-live', () => {
  /**
   * Mock the telldus-live-promise request API
   */

  let requestSpy = sinon.spy(() => {
    return new Promise(function (resolve) {
      resolve(data.twoDevices);
    });
  });

  let apiSpy = sinon.spy(() => {
    return {
      request: requestSpy
    };
  });

  let telldusApi = {
    API: apiSpy
  };

  let telldusLive;

  beforeEach(() => {
    mockery.enable({useCleanCache: true});
    mockery.warnOnUnregistered(false);
    mockery.registerMock('telldus-live-promise', telldusApi);
    telldusLive = require('../lib');
  });

  afterEach(() => {
    mockery.deregisterMock('telldus-live-promise');
    mockery.disable();
  });

  describe('#init', () => {
    it('should init telldus API', done => {
      const si = seneca(senecaOpts);

      let options = {options: {}};

      si.use(telldusLive, options);

      si.ready(() => {
        assert(apiSpy.calledOnce);
        assert(apiSpy.calledWith(options));
        done();
      });
    });
  });
});
