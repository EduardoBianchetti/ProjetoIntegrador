const MidiaUsuario = require("../model/MidiaUsuarioSchema");

module.exports = {
  listar: async (req, res) => {
    MidiaUsuario.find((err, objetos) => {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    })
      .populate("midia")
      .populate("usuario")
      .sort({ status: 1 });
  },
  obterPeloId: (req, res) => {
    MidiaUsuario.findOne({ _id: req.params.id }, function (err, obj) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    })
      .populate("midia")
      .populate("usuario");
  },
  filtrar: (req, res) => {
    MidiaUsuario.find(
      {
        $or: [{ status: { $regex: req.params.filtro, $options: "i" } }],
      },
      function (err, obj) {
        err ? res.status(400).send(err) : res.status(200).json(obj);
      }
    )
      .populate("midia")
      .populate("usuario")
      .sort({ status: -1 });
  },
  favoritar: async (req, res) => {
    var midiaFavorita = await MidiaUsuario.findOne({ _id: req.params.id });
    if (midiaFavorita.favorito === "Não") {
      midiaFavorita.favorito = "Sim";
    } else {
      midiaFavorita.favorito = "Não";
    }
    MidiaUsuario.updateOne(
      { _id: midiaFavorita._id },
      midiaFavorita,
      function (err) {
        err ? res.status(400).send(err) : res.status(200).json("message:ok");
      }
    );
  },
  listarFavoritos: async (req, res) => {
    MidiaUsuario.find(
      { usuario: req.params.id, favorito: "Sim" },
      function (err, obj) {
        err ? res.status(400).send(err) : res.status(200).json(obj);
      }
    )
      .populate("midia")
      .populate("usuario")
      .sort({ status: 1 });
  },
  notaMedia: async (req, res) => {
    try {
      var midia = await MidiaUsuario.find({ midia: req.params.id });
      var soma = 0;
      var media = 0;
      for (var i = 0; i < midia.length; i++) {
        soma = soma + midia[i].nota;
      }
      media = soma / midia.length;
      res.status(200).json(media);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};