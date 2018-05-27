module.exports = (stampit, User, validator, validateMessages, registrationValidator) => {

  return stampit(registrationValidator, {
    props: {
      checkEmail: validator.check('email')
        .trim()
        .exists().withMessage(validateMessages.exists)
        .normalizeEmail()
        .custom(async (value, {req, location, path}) => {
          let user = await User.findOne({
            [path]: value,
          });

          if(user) {
            let resultVerification = user.verifyPassword(req.body.password);

            return resultVerification;
          } else {
            return false
          }
        }).withMessage(validateMessages.dataNotFound),
    }
  });
};