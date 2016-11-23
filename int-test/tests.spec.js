/**
 * Created by @author jonas on 2016-11-22.
 *
 * Copyright 2016 (C) jonas
 * License: MIT
 */

/* eslint max-nested-callbacks: ["error", 10] */

'use strict';

const assert = require('assert');
const seneca = require('seneca');

const plugin = require('../lib');

const telldusTestConf = require('./telldus-test-conf');

const senecaOpts = {
  log: {level: 'silent'}
};

describe('integration tests', () => {
  describe('messages', () => {
    let si;
    beforeEach('use plugin', () => {
      si = seneca(senecaOpts);
      si.use(plugin, telldusTestConf.options);
    });

    describe('{role: "telldus-devices", cmd: "list"}', () => {
      it('should return a object containing a array of devices', done => {
        si.act({role: 'telldus-devices', cmd: 'list'}, (err, result) => {
          assert(!err);
          assert.notEqual(result.device.length, 0);
          done();
        });
      });
    });

    describe('{role: "telldus-device", cmd: "turnOn"}', () => {
      it('should return a success message', done => {
        si.act({role: 'telldus-device', cmd: 'turnOn', id: telldusTestConf.onOffDevice}, (err, result) => {
          assert(!err);
          assert.deepEqual(result.status, 'success');
          done();
        });
      });
    });

    describe('{role: "telldus-device", cmd: "turnOff"}', () => {
      it('should return a success message', done => {
        si.act({role: 'telldus-device', cmd: 'turnOff', id: telldusTestConf.onOffDevice}, (err, result) => {
          assert(!err);
          assert.deepEqual(result.status, 'success');
          done();
        });
      });
    });

    describe('{role: "telldus-device", cmd: "getState"}', () => {
      it('should return the current state', done => {
        si.act({role: 'telldus-device', cmd: 'getState', id: telldusTestConf.onOffDevice}, (err, result) => {
          assert(!err);
          assert.deepEqual(result.status, 'success');
          assert(['on', 'off', 'up', 'down'].indexOf(result.state) !== -1);
          done();
        });
      });
    });
  });
});
