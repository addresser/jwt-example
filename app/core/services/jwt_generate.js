module.exports = (jsonWebToken, jwtConfig) => {
  return (name, email) => {
    return jsonWebToken.sign({
      name: name,
      email: email,
    }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  };
};