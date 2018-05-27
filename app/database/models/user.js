module.exports = (dbConnect, hidden, bcrypt) => {
  const Schema = dbConnect.Schema;

  let UserSchema = new Schema({
    email: { type: String },
    name: { type: String },
    password: { type: String, hideJSON: true, bcrypt: true },
  });

  UserSchema.plugin(hidden());
  UserSchema.plugin(bcrypt);

  return dbConnect.model('User', UserSchema);
};