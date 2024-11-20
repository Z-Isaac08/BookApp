const HttpException = require('./root');

class BadRequestException extends HttpException {
    constructor(message) {
        super(message, 400);
    }
}

module.exports = BadRequestException;
