const bcrypt = require('bcrypt')
const User = require('../model/user');
const CryptoJS = require('crypto-js');


const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  const encryptedEmail = CryptoJS.AES.encrypt(req.body.email, 'secret key').toString();
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: encryptedEmail,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({
          message: 'Utilisateur créé !'
        }))
        .catch(error => res.status(400).json({
          error
        })); 
    })
    .catch(error => res.status(500).json({
      error
    }));
  };
exports.login = (req, res, next) => {
  const decryptedEmail = CryptoJS.AES.decrypt(req.body.email, 'secret key').toString(CryptoJS.enc.Utf8);
  User.findOne({
      email: decryptedEmail
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Utilisateur non trouvé !'
        });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: 'Mot de passe incorrect !'
            });
          }
          res.status(200).json({ 
            userId: user._id,
           
            token: jwt.sign( 
              {
                userId: user._id
              }, 
              'RANDOM_TOKEN_SECRET', 
              {
                expiresIn: '24h'
              }
            )
          });
        })
        .catch(error => res.status(500).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));
};
