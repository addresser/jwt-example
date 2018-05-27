module.exports = (User, jwtGenerate) => {

  class UserController {

    async postLogin(req, res, next) {

      res.json({
        "token": jwtGenerate(req.user.name, req.user.email),
      });

      next();
    }

    async postRegister(req, res, next) {
      let user = new User(req.body);

      await user.save();

      res.json({
        "token": jwtGenerate(req.body.name, req.body.email),
      });

      next();
    }
  }

  return new UserController();
};
