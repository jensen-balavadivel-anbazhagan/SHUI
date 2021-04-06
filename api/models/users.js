const { hashPassword, matchPassword } = require('./encryptPassword');
const { generateToken } = require('./token')
const { v4: uuidv4 } = require('uuid');
const db = require('../dataBase/db');

module.exports = {
    async createUser(body) {
        const user = db.getUserData(body.userName);
        if (user) {
            return false
        } else {
            const passwordHash = await hashPassword(body.password);
            const newuuid = uuidv4();
            const newUser = {
                userName: body.userName,
                email: body.email,
                password: passwordHash,
                uuid: newuuid
            }
            return await db.createData('users',newUser);
        }
    },
    async authorizeUser(body) {
        const user = db.getUserData(body.userName);
        if (!user) {
            return false;
        } else {
            const passwordMatch = await matchPassword(body.password, user.password);
            if (passwordMatch) {
                const matchedUser = {
                    userName: user.userName,
                    uuid: user.uuid,
                }
                const token = generateToken(matchedUser);
                return token
            } else {
                return false
            }
        }
    },
    async findUser(userName) {
        const user = db.getUserData(body.userName);
        return user;
    },
    async findUserByuuid(uuid) {
        const user = await db.findUserByuuid(uuid );
        return user;
    },
    async addtag(inputData, userInfo) {
        const user = await db.findUserByuuid(userInfo.uuid);
            const newuserInfo = db.updateData('users',tags, { tagName: inputData.tagName, id: new Date().getTime() })
            return newuserInfo > 1
    },
    async getTags(userInfo) {
        const user = await db.findUserByuuid(userInfo.uuid);
        return user
    },
    async removeTag(body, userInfo) {
       
        const tagRemove = await userDb.update({ uuid: userInfo.uuid }, { $pop: { tags: body.id } })
        return tagRemove == 'undefined' || tagRemove == null;
    },
    async removeAllTags(userInfo) {
        const user = await db.findUserByuuid(userInfo.uuid);
        const deleteTag = db.updateData('users',tags, {})
        return deleteTag == 'undefined' || deleteTag == null;
    },
    async deleteUser(userInfo) {
        const removedUser = db.removeData('users', userInfo.uuid);
        return removedUser == 'undefined' || removedUser == null;
    }

}
