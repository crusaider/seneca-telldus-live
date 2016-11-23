# seneca-telldus-live [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Seneca plugin for communication with the Telldus live service public API.

## Seneca
This module is a plugin to the Seneca microservices toolkit. Read more at http://senecajs.org.
## Installation

```sh
$ npm install --save seneca-telldus-live
```
## Seneca Actions
Most of the actions are just simple mappings to the Telldus live API, you can expect to get back what the API would return.
### role: 'telldus-devices'
#### cmd: 'list'
Returns a list of all devices managed by the Telldus live service, the result will be a json object identical to the
object returned from the api: http://api.telldus.com/explore/devices/list.
### role: 'telldus-device'
All the actions in the the role `telldus-device` expects a key `id` in the action that identifies the device to act upon.
#### cmd: 'turnOn'
Turns a device on, (see: http://api.telldus.com/explore/device/turnOn).
Returns a object that contains the device `id` and a `status: 'success'` if successful.
#### cmd: 'turnOff'
Turns a device off, (see: http://api.telldus.com/explore/device/turnOff).
Returns a object that contains the device `id` and a `status: 'success'` if successful.
#### cmd: 'getState'
Returns a object that contains the device `id` and a `state` key. The state ca be one of:
* `on`
* `off`
* `up`
* `down`

## Build and test
Clone the repository to you favourite location. Run `$ npm install`. Since `gulp` is used as the build tool it is
convenient to install the `gulp-cli` globally on your machine `$ npm install -g gulp-cli`.
### Unit tests
Run the unit tests using `$ npm test` or `$ gulp test`.
### Integration tests
The integration tests can be run using `$ gulp int-test`. The integration tests will call the Telldus live API when
they run. For this to work you will have to supply credentials and some other account specific details to the tests.
Please refer to `int-test/sample-telldus-test-conf.js`.
## TODO
There are a great number of features in the Telldus live API not yet supported. (see: http://api.telldus.com)
## License

MIT © [Jonas Andreasson](https://twitter.com/Crusaider)


[npm-image]: https://badge.fury.io/js/seneca-telldus-live.svg
[npm-url]: https://npmjs.org/package/seneca-telldus-live
[travis-image]: https://travis-ci.org/crusaider/seneca-telldus-live.svg?branch=master
[travis-url]: https://travis-ci.org/crusaider/seneca-telldus-live
[daviddm-image]: https://david-dm.org/crusaider/seneca-telldus-live.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/crusaider/seneca-telldus-live
