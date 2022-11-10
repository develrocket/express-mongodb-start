const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = function () {
    return {
        doLogin: async function(req, res) {
            let {email, password} = req.body;

            let users = await UserModel.find({email: email}).lean().exec();
            let error = false;
            if (users.length > 0) {
                let user = users[0];
                let psdValidation = bcrypt.compareSync(password, user.password);
                if (!psdValidation) {
                    error = true;
                } else {
                    req.session.user = user;
                }
            } else {
                error = true;
            }

            if (error) {
                res.locals = {
                    title: 'Login'
                };
                return res.render('login', {error: 'Invalid email password.'});
            }

            res.redirect('/');
        },

        doRegister: async function(req, res) {
            let {name, email, password, confirm_password} = req.body;
            let users = await UserModel.find({email: email}).lean().exec();
            if (users.length > 0) {
                res.locals = {
                    title: 'Register'
                };
                return res.render('register', {error: 'Email is already exists!'});
            }

            let hashPassword = bcrypt.hashSync(password, 10);

            let user = new UserModel({
                username: name,
                email,
                password: hashPassword
            });

            user = await user.save();

            req.session.user = user;

            res.redirect('/');
        }
    }
}