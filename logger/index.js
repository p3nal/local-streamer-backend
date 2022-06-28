const logger = (req, res, next) => {
  const ip = req.header['x-forwarded-for'] || req.connection.remoteAddress;
  const log = `${req.protocol}://${req.get('host')}${req.originalUrl}  ${ip}`;
  console.log(log);
  next();
}

module.exports = logger;
