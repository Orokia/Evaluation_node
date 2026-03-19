const Message = require("../models/messageModel");



const createMessage = async (req, res) => {

     const {title,content,type } = req.body;
     if(!title || !content || !type ||typeof title !== "string" || typeof content!== "string") {
    return response.status(400).json({message:"Le corps de la requête doit contenir name et description, en string", error:true})
  }
  try {
   
       const newMessage = await Message.create({title:title,content:content})
   
        res.status(201).json({message:"Le personnage a été creé", message:newMessage})
   
  } catch (error) {
    console.log("ERREUR =", error); 
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