# Evaluation_node

 API Messages - Node.js / Express / Sequelize

Description

Cette API permet de gérer des messages avec les fonctionnalités suivantes :

 Création de messages
 Lecture de messages publics
 Lecture de messages privés (lecture unique)
 Association d’un message à un utilisateur


 Installation*
 
Installer les dépendances :


npm install


Configurer les variables d’environnement :

Créer un fichier `.env` à la racine :

env
PORT=3009
ENV=DEV
DB_DEV=mysql://user:password@localhost:3306/nom_db
DB_PROD=mysql://user:password@localhost:3306/nom_db
JWT_SECRET=secret

 Lancement

Démarrer le serveur :

npm run dev


Le serveur sera accessible sur :


http://localhost:3009



 Endpoints principaux

 Messages

 Créer un message

POST /messages


Body JSON :

{
  "title": "Mon message",
  "content": "Contenu du message",
  "type": "public",
  "userId": 1
}

Récupérer tous les messages publics


GET /messages




 Récupérer un message par ID


GET /messages/:id


 Si le message est public → affiché normalement
Si privé → supprimé après lecture



 Relation User / Message

Associer un message à un utilisateur


POST /users/:id/messages


Body JSON :


{
  "messageId": 1
}

 Route protégée (exemple)


GET /protected


Header :


Authorization: Bearer <token>



Règles métier

* Un message appartient à un utilisateur
* Les messages publics sont accessibles à tous
* Les messages privés sont supprimés après lecture
* Seuls les utilisateurs connectés peuvent créer un message



 Technologies utilisées

* Node.js
* Express
* Sequelize
* MySQL
* JWT (authentification)

