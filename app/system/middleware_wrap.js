module.exports = (middleware) => {
  return (req, res, next) => {
      middleware(req, res, next).catch(next)
  }
};