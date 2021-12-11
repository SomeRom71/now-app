const ApiError = require('../helpers/apiError');
const bcrypt = require('bcrypt');
const UserService = require('../services/user.service');
const { generateJwt } = require('../helpers');

class UserController {
    async registration(req, res, next) {
        const { firstname, lastname, birth, country, city, email, password } = req.body;
        const candidate = await UserService.findUserByEmail(email);
        if (candidate) {
            return next(ApiError.internal('User with the same email already exist'));
        };
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await UserService.createUser({firstname, lastname, birth, country, city, email, password: hashPassword});
        const token = generateJwt(user.id, user.email);
        res.cookie("Authorization", 'Bearer ' + token, {
            expires: new Date(Date.now() + 24 * 3600000)
        });
        res.end();
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await UserService.findUserByEmail(email);
        if (!user) {
            return next(ApiError.internal('User not found.'));
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        delete user.dataValues.password;
        if (!comparePassword) {
            return next(ApiError.internal('Wrong password'));
        };
        const token = generateJwt(user.id, user.email);
        res.cookie("Authorization", 'Bearer ' + token, {
            expires: new Date(Date.now() + 24 * 3600000)
        }).json(user);
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email);
        const user = await UserService.findUserByEmail({where: { email: req.user.email }});
        delete user.dataValues.password;
        res.cookie("Authorization", 'Bearer ' + token, {
            expires: new Date(Date.now() + 24 * 3600000)
        }).json(user);
    }
}

module.exports = new UserController();