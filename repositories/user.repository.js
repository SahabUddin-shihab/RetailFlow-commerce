const User = require('../models/user.model');
const BaseRepository = require('./base.repository');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email, includePassword = false) {

        let query = this.model.findOne({ email: email.toLowerCase() });
        if (includePassword) query = query.select('+password');
        return query;
    }

    async findByEmailWithTokens(email) {

        return this.model.findOne({ email: email.toLowerCase() })
            .select('+password +emailVerificationToken +emailVerificationExpires +passwordResetToken +passwordResetExpires +refreshToken');
    }

    async findByRefreshToken(token) {

        return this.model.findOne({ refreshToken: token }).select('+refreshToken');
    }

    async findByVerificationToken(token) {

        return this.model.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() }
        }).select('+emailVerificationToken +emailVerificationExpires');
    }

    async findByResetToken(token) {

        return this.model.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        }).select('+password +passwordResetToken +passwordResetExpires');
    }

   
}

module.exports = UserRepository;
