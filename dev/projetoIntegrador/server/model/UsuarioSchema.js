const mongoose = require("mongoose");
//const jwt = require("jsonwebtoken");
const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipo: { type: String, default: 'normal' },
  dataNascimento: {type: Date, required: true}
});
// UsuarioSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     { _id: this._id, nome: this.nome },
//     process.env.JWT_PRIV_KEY,
//     { expiresIn: process.env.TOKEN_EXPIRE }
//   );
//   return token;
// };
module.exports = mongoose.model("Usuario", UsuarioSchema);
