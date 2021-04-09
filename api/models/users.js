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
        let tag = {
            "id" : new Date().toUTCString(),
            "tagName" : inputData.tagName
        }
        let tags = [];
        if(user.tags != 'undefined' && user.tags != null && user.tags.length >0) {
            user.tags.forEach(userTag =>{
                tags.push(userTag)
            });
            tags.push(tag);
    } else {
        tags.push(tag);
    }
    console.log("tags to add:" + JSON.stringify(tags));
            const newuserInfo = db.updateUserTags('users',userInfo.uuid, tags)
            return newuserInfo;
    },
    async getTags(userInfo) {
        const user = await db.findUserByuuid(userInfo.uuid);
        return user;
    },
    async removeTag(body, userInfo) {
         const user = await db.findUserByuuid(userInfo.uuid);
         const tags = [];
         if(user.tags != 'undefined' && user.tags != null) {
            user.tags.forEach(tag => {
                if(tag.id != body.id) {
                    tags.push(tag);
                }
            });
         }
         console.log(JSON.stringify(tags));
        const tagRemove = await db.updateUserTags('users',userInfo.uuid, tags )
        return await db.findUserByuuid(userInfo.uuid).tags;
    },
    async removeAllTags(userInfo) {
        const user = await db.findUserByuuid(userInfo.uuid);
        const deleteTag = db.updateUserTags('users',userInfo.uuid,{})
        return deleteTag == 'undefined' || deleteTag == null;
    },
    async deleteUser(userInfo) {
        const removedUser = db.removeData('users', userInfo.uuid);
        return removedUser == 'undefined' || removedUser == null;
    }

}
