const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const env = require('../environments/environment');

module.exports = {
    loginUser: (req, res) => {
        let userValidation = validateUser(req.body);
        if (userValidation && userValidation.status === "success") {
            let userName = (req.body.userName && req.body.userName.trim());
            User.findOne({ userName: userName }).exec((err, existingUser) => {
                if (err) {
                    console.log('Error while finding if user already exists', err);
                    return res.status(500).send(err);
                }
                if (existingUser) {
                    comparePasswords(req.body.password, existingUser.password).then(() => {
                        let userData = {};
                        userData.userName = existingUser.userName;
                        userData.id = existingUser._id;
                        return res.json({ status: "success", message: "User login successful", data: userData });
                    }).catch(() => {
                        return res.status(401).send({ status: "failure", message: "Credentials don't match up" });
                    });
                } else {
                    return res.status(401).send({ status: "failure", message: "Credentials don't match up" });
                }
            });
        } else {
            return res.status(400).send(userValidation);
        }
    },
    /**
     * @author sriram.j
     * @description create new user
     * @param req
     * @param res 
     */
    createUser: (req, res) => {
        let userValidation = validateUser(req.body);

        if (userValidation && userValidation.status === 'success') {

            let userName = (req.body.userName && req.body.userName.trim());
            User.findOne({ userName: userName }).exec((err, existingUser) => {
                if (err) {
                    console.log('Error while finding if user already exists', err);
                    return res.status(500).send(err);
                }
                if (existingUser) {
                    return res.status(409).send({ status: 'failure', message: 'Username already exists' });
                }

                hashPassword(req.body.password).then((hashedPassword) => {
                    let user = new User(
                        {
                            userName: userName,
                            password: hashedPassword
                        }
                    );

                    user.save(function (err, response) {
                        if (err) {
                            console.log('Error while saving user', err);
                            return res.status(500).send(err);
                        }

                        let userData = {};
                        userData.userName = response.userName;
                        userData.id = response._id;
                        res.json({ status: "success", message: "User created successfully", data: userData });
                    })
                }).catch(() => {
                    return res.json({ status: "failure", message: "User creation unsuccessful" });
                });
            });
        } else {
            return res.status(400).send(userValidation);
        }
    }
};

/**
 * @author sriram.j
 * @description hash the password provided by the user
 * @param plainText the plain text password provided by the user
 */
hashPassword = (plainText) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainText, env.saltRounds).then((hash) => {
            return resolve(hash);
        }).catch((err) => {
            console.log("Error while hashing", err);
            return reject();
        });
    })
}

/**
 * @author sriram.j
 * @description compare the passwords provided and in db
 */
comparePasswords = (plainText, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hash).then((match) => {
            if (match) {
                return resolve();
            } else {
                return reject();
            }
        });
    });
}

/**
 * @author sriram.j
 * @description validate the user body
 * @param body the request body
 */
validateUser = function (body) {
    try {
        if (body) {
            if ((!body.userName || !body.userName.trim()) && !body.password) {
                return { status: "failure", message: "Username and password is required" };
            }
            if (!body.userName || !body.userName.trim()) {
                return { status: "failure", message: "Username is required" };
            }
            if (!body.password) {
                return { status: "failure", message: "Password is required" };
            }
            return { status: "success" };
        } else {
            return { status: "failure", message: "No content found" };
        }
    } catch (error) {
        console.log('Error while validating user', error);
        return { status: "failure", message: "Exception while processing information" };
    }
}