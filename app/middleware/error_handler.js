module.exports = () => {

  class ErrorHandler{
    catch(err, req, res, next) {
      if (!err.statusCode) {
        return res.status(500).json({error: err.message});
      }

      res.status(err.statusCode).json({ error: err.message });
    }
  }

  return new ErrorHandler();
};
