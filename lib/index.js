/**
 * Created by @author jonas on 2016-11-21.
 *
 * Copyright 2016 (C) jonas
 * License: MIT
 */

/* eslint new-cap: "off" */
/* eslint no-warning-comments: "warn" */

'use strict';

const telldus = require('telldus-live-promise');
const constants = require('telldus-live-constants');
const querystring = require('querystring');

const name = 'telldus-live';

module.exports = function (options) {
  let seneca = this;
  let telldusApi;

  seneca.add({init: name}, init);
  seneca.add({role: 'telldus-devices', cmd: 'list'}, listDevices);
  seneca.add({role: 'telldus-device', cmd: 'turnOn'}, deviceTurnOn);
  seneca.add({role: 'telldus-device', cmd: 'turnOff'}, deviceTurnOff);
  seneca.add({role: 'telldus-device', cmd: 'getState'}, deviceGetState);

  function init(args, done) {
    telldusApi = telldus.API(options);
    done();
  }

  function listDevices(msg, reply) {
    msg = seneca.util.deepextend(msg, {includeIgnored: true});

    let queryParams = {
      supportedMethods: constants.SUPPORTED_METHODS,
      includeIgnored: msg.includeIgnored ? 1 : 0
    };

    telldusApi.request('/devices/list?'
      .concat(querystring.stringify(queryParams)))
      .then(response => {
        reply(null, response);
      }).catch(reply);
  }

  function deviceTurnOn(msg, reply) {
    telldus.Devices(telldusApi).turnOn(msg)
      .then(response => {
        if ('error' in response) {
          return reply(response);
        }
        response.id = msg.id;
        return reply(null, response);
      }).catch(reply);
  }

  function deviceTurnOff(msg, reply) {
    telldus.Devices(telldusApi).turnOff(msg)
      .then(response => {
        if ('error' in response) {
          return reply(response);
        }
        response.id = msg.id;
        return reply(null, response);
      }).catch(reply);
  }

  function deviceGetState(msg, reply) {
    msg = seneca.util.deepextend(msg, {includeIgnored: true});

    let queryParams = {
      id: msg.id,
      supportedMethods: constants.SUPPORTED_METHODS
    };

    telldusApi.request('/device/info?'
      .concat(querystring.stringify(queryParams)))
      .then(response => {
        if ('error' in response) {
          return reply(response);
        }
        let result = {status: 'success', id: response.id};
        switch (parseInt(response.state, 10)) {
          case constants.COMMANDS.on:
            result.state = 'on';
            return reply(null, result);
          case constants.COMMANDS.off:
            result.state = 'off';
            return reply(null, result);
          case constants.COMMANDS.up:
            // TODO: Validate that UP actually is a possible state of a device
            result.state = 'up';
            return reply(null, result);
          case constants.COMMANDS.down:
            // TODO: Validate that DOWN actually is a possible state of a device
            result.state = 'down';
            return reply(null, result);
          default:
            return reply(new Error('Unrecognized device state'));
        }
      }).catch(reply);
  }

  return name;
};
