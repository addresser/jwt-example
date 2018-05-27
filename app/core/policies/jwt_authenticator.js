module.exports = (User, passport, passportJWT, jwtConfig) => {

  let options = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.secret,
    userProperty: 'user',
    session: false,
  };

  passport.use(new passportJWT.Strategy(options, (payload, done) => {
    User.findOne({
        email: payload.email
    })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
  }));

  return passport;
};
