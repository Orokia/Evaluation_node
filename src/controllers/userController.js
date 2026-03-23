const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');



const register = async (request, response) => {
  const { email, password, username } = request.body || {};

  
  if (!email || !password || !username) {
    return response.status(400).json({
      message: "Champs requis manquants",
      error: true
    });
  }

  try {
    const salt = Number(process.env.SALT);
    const hashed = await bcrypt.hash(password, salt);

  
    const userExist = await User.findOne({
      where: { email }
    });

    if (userExist) {
      return response.status(400).json({
        message: "Adresse email déjà utilisée",
        error: true
      });
    }

    const newUser = await User.create({
      email,
      passwordHash: hashed,
      username
    });

    response.status(201).json({
      message: `Utilisateur ${newUser.username} créé`
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    response.status(500).json({
      message: error.message,
      error: true
    });
  }
};



const signin = async (request, response) => {
  const { email, password } = request.body || {};

  
  if (!email || !password) {
    return response.status(400).json({
      message: "Email et password requis",
      error: true
    });
  }

  try {
    const userExist = await User.findOne({
      where: { email }
    });

    if (!userExist) {
      return response.status(404).json({
        message: "Utilisateur introuvable",
        error: true
      });
    }

    const isAuthenticated = await bcrypt.compare(
      password,
      userExist.passwordHash
    );

    if (!isAuthenticated) {
      return response.status(401).json({
        message: "Mot de passe incorrect",
        error: true
      });
    }

    const token = jwt.sign(
      {
        id: userExist.id,
        role: userExist.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    response.json({
      message: "Connexion réussie",
      token
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    response.status(500).json({
      message: "Erreur serveur",
      error: true
    });
  }
};



const deleteUser = (request, response) => {};

module.exports = {
  register,
  signin,
  deleteUser
};