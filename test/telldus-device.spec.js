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

const senecaOpts = {
  log: {level: 'error+'}
};

describe('role: telldus-device', () => {
  let plugin;
  let tlp = {};

  beforeEach(() => {
    mockery.enable({useCleanCache: true});
    mockery.warnOnUnregistered(false);
    mockery.registerMock('telldus-live-promise', tlp);
    plugin = require('../lib');
  });

  afterEach(() => {
    mockery.deregisterMock('telldus-live-promise');
    mockery.disable();
  });

  let si;
  beforeEach('use plugin', () => {
    si = seneca(senecaOpts);
    si.use(plugin);
  });

  describe('cmd: "getState"', () => {
    it('should return a success message with the state "on"', done => {
      let requestSpy = sinon.spy(() => {
        return new Promise(resolve => {
          resolve({status: 'success', state: 1, id: 1});
        });
      });

      tlp.API = () => {
        return {request: requestSpy};
      };
      si.act({role: 'telldus-device', cmd: 'getState', id: 1}, (err, result) => {
        assert(!err);
        assert.equal(result.status, 'success');
        assert.equal(result.id, 1);
        assert.equal(result.state, 'on');
        assert(requestSpy.calledOnce);
        done();
      });
    });
  });

  describe('cmd: "turnOn"', () => {
    it('should return a success message', done => {
      let turnOnSpy = sinon.spy(() => {
        return new Promise(resolve => {
          resolve({status: 'success', id: 1});
        });
      });

      tlp.Devices = () => {
        return {turnOn: turnOnSpy};
      };
      si.act({role: 'telldus-device', cmd: 'turnOn', id: 1}, (err, result) => {
        assert(!err);
        assert.equal(result.status, 'success');
        assert.equal(result.id, 1);
        assert(turnOnSpy.calledOnce);
        done();
      });
    });
  });

  describe('cmd: "turnOff"', () => {
    it('should return a success message', done => {
      let turnOffSpy = sinon.spy(() => {
        return new Promise(resolve => {
          resolve({status: 'success', id: 1});
        });
      });

      tlp.Devices = () => {
        return {turnOff: turnOffSpy};
      };
      si.act({role: 'telldus-device', cmd: 'turnOff', id: 1}, (err, result) => {
        assert(!err);
        assert.equal(result.status, 'success');
        assert.equal(result.id, 1);
        assert(turnOffSpy.calledOnce);
        done();
      });
    });
  });
});

