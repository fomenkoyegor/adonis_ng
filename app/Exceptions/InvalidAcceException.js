'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions');

class InvalidAcceException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, {response}) {
    return response.status(403).json({
      error:'invalid access to resource'
    })
  }
}

module.exports = InvalidAcceException;
