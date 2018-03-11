const fs = require('fs');
const logger = require('koa-morgan');
const config = require('config');

const accessLogStream = fs.createWriteStream(
  `${__dirname}/../${config.get('logger.filename')}`,
  {
    flags: config.get('logger.props.flags')
  }
);

module.exports = logger('combined', { stream: accessLogStream });
