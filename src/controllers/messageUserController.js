const Message = require('../models/messageModel');
const User = require('../models/userModel');

const relation = async (req, res) => {

  const userId = req.params.id;
  const messageId = req.body.messageId;

  if (!messageId || isNaN(Number(messageId))) {
    return res.status(400).json({
      message: 'Merci de fournir un id de message valide',
    });
  }
  console.log(messageId, userId)
  try {

    const user = await User.findByPk(userId);
    const message = await Message.findByPk(messageId);
    console.log(message,user)

    if (!user || !message) {
      return res.status(404).json({
        message: "Utilisateur ou message introuvable",
        error: true
      });
    }

    // 🔥 correction ici
    await message.setUser(user);

    res.json({
      message: 'Message lié à l’utilisateur'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erreur serveur',
      error: error.message
    });
  }

};

module.exports = { relation };