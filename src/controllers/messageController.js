const Message = require("../models/messageModel");



const createMessage = async (req, res) => {
  try {
    console.log("BODY =", req.body); // 🔥

    const message = await Message.create(req.body);

    res.status(201).json(message);
  } catch (error) {
    console.log("ERREUR =", error); // 🔥
    res.status(500).json({ error: error.message });
  }
};


const getMessage = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { type: 'public' }
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.messages });
  }
};


const getMessageById = async (req, res) => {
  try {
    const messages = await Message.findByPk(req.params.id);

    if (!messages) {
      return res.status(404).json({ message: "Message non trouvé" });
    }

    
    if (messages.type === 'lecture_unique') {
      await messages.destroy();
    }

    res.json(messages);

  } catch (error) {
    res.status(500).json({ error: error.messages });
  }
};
module.exports = { createMessage, getMessageById, getMessage }