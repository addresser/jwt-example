module.exports = (stampit, User, validator, validateMessages, createError) => {

  return stampit({
    props: {
      checkName: validator.check('name')
        .trim()
        .exists().withMessage(validateMessages.exists)
        .isLength({min: 5, max: 25}).withMessage(validateMessages.isLength),

      checkPassword: validator.check('password')
        .trim()
        .exists().withMessage(validateMessages.exists)
        .isLength({min: 5, max: 25}).withMessage(validateMessages.isLength),

      checkEmail: validator.check('email')
        .trim()
        .normalizeEmail()
        .exists().withMessage(validateMessages.exists)
        .custom(async (value, {req, location, path}) => {
          let user = await User.findOne({
            [path]: value,
          });

          return user ? false : true;
        }).withMessage(validateMessages.dataFound),
    },

    methods: {
      checkValidationResult(req, res, next) {
        let errors  = validator.validationResult(req);

        if(!errors.isEmpty()) {
          return next(createError(422, JSON.stringify(errors.mapped())));
        }
        next();
      }
    }
  });
};