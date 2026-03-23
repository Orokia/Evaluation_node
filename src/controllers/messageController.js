const Message = require("../models/messageModel");
const User = require("../models/userModel");


const createMessage = async (req, res) => {

  const { title, content, type } = req.body;
  const userId = req.user .id || req.body.userId;

  if (!title || !content || !type) {
    return res.status(400).json({
      message: "Entrer le titre, le contenu et le type du message",
      error: true
    });
  }

  try {

    const newMessage = await Message.create({
      title,
      content,
      type,
      UserId: userId 
    });

    res.status(201).json({
      message: "Le message a été créé",
      data: newMessage
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
};




const getMessage = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { type: "public" } 
    });

    res.json(messages);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getMessageById = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id, {include: User});

    if (!message) {
      return res.status(404).json({
        message: "Message non trouvé"
      });
    }

  
    if (message.type === "public") {
      return res.json(message);
    }

    
    if (message.type === "prive") {
      const data = message;

      await message.destroy();

      return res.json({
        message: "Message lu puis supprimé",
        data
      });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { createMessage, getMessageById, getMessage }