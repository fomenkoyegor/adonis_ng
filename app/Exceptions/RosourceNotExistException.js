'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions');

class RosourceNotExistException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, {response}) {
    response.redirect('/');
    return response.status(404).json({
      error:'кукукукукукукукук'
    })
  }
}

module.exports = RosourceNotExistException;
