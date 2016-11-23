/**
 *  The integration tests run actual live requests against the telldus live service.
 *  Form them to work they need some data that is unique for the account used.
 *  A version of this file should be created and named 'telldus-test-conf.js'
 */

/**
 * Telldus credentials for the account used.
 */
module.exports.options = {
  telldusPublicKey: '[public key]',
  telldusPrivateKey: '[private key]',
  telldusToken: '[token]',
  telldusTokenSecret: '[token secret]'
};

/**
 * Id of a device that will be turned on and off by the tests.
 */
module.exports.onOffDevice = 1234567;
