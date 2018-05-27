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

          if(!user) return false;

          return user.verifyPasswordSync(req.body.password);
        }).withMessage(validateMessages.dataFound),
    }
  });
};