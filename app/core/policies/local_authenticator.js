module.exports = (User, passport, localStrategy) => {

  passport.use(new localStrategy({
      usernameField: "email",
      passwordField: 'password',
      session: true,
    },
    (email, password, done) => {
      User.findOne({
        email: email,
      })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err);
      });
    }
  ));

  return passport;
};