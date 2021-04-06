const db = require('../dataBase/db');
const { textcryptr, convertToText } = require('./cryptrData');

module.exports = {
    async addStreams(body, userInfo) {
        console.log("addStreams: ",body, userInfo)
        const user = db.findUserByuuid(userInfo.uuid);
        console.log("addStreams returned User: ",user)
        if (!user) {
            return false
        } else {
            const encryptedDescription = textcryptr(body.description)
            const timeStamp = new Date().toUTCString();
            const availableStreams = db.getDbData('streams');
            let idVal = 0;
            if(availableStreams != 'undefined' && availableStreams != null) {
            idVal = availableStreams.length+1;
        }

            const newStream = {
                title: body.title,
                uuid: userInfo.uuid,
                description: encryptedDescription,
                date: timeStamp,
                id: idVal
            }
            console.log("newStream: ",newStream)
            return await db.createData('streams', newStream);
        }

    },
    async getStreams(userInfo) {
        const streams = db.getStreamsByuuid(userInfo.uuid )
        const decryptStreams = streams.map(stream => {
            const decryptDescription = convertToText(stream.description)
            console.log("decryptDescription: ",decryptDescription)
            const streamData = {
                title: stream.title,
                description: decryptDescription,
                date: stream.date,
                id: stream.id,
            }
            console.log("streamData: ",streamData)
            return streamData
        })
        return decryptStreams
    },
    async removeStream(body) {
        console.log("removeStream: ",body)
        const stream = db.getStreamsById(body.id);
        db.removeData('streams', stream.uuid);
        const deletedStream = db.getStreamsById(body.id);
        return deletedStream == 'undefined' || deletedStream == null;
    },
    async removeAllStreams(userInfo) {
        db.removeData('streams', userInfo.uuid);
        const deletedStream = await db.getStreamsByuuid(userInfo.uuid);
        return deletedStream == 'undefined' || deletedStream == null;
    },

}