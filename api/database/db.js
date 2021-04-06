const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./dataBase/suhidb.json');
const db = low(adapter);

//DB operations
//To retrive all items
module.exports.getDbData = (dataKey) => {
    let data = db.get(dataKey).value();
    if(data != 'undefined' && data != null && data != '') {
        return data;
    } 
}

//To retrive the user details from DB  based on the condnKey
module.exports.getUserData = (condnKey) => {
  return db.get('users').find({ userName: condnKey }).value();
}

module.exports.findUserByuuid = (condnKey) => {
  return db.get('users').find({ uuid: condnKey }).value();
}

//To retrive the details from DB  based on the condnKey
module.exports.getStreamsByuuid = (condnKey) => {
    return db.get('streams')
  .filter(post => post.uuid = condnKey)
  .value()
  }

  //To retrive the details from DB  based on the condnKey
module.exports.getStreamsById = (condnKey) => {
  return db.get('streams')
  .filter(post => post.id = condnKey)
  .value()
}

  //To create data into DB
  module.exports.createData = (dataKey, data) => {
     return  db.get(dataKey).push(data).write();
  }
//To remove the user data
  module.exports.removeData = (dataKey,condnKey) => {
    return  db.get(dataKey).remove(post => post.uuid = condnKey).write();
  }


   //To update the data
   module.exports.updateData = (dataKey, key, value) => {

    return db.get(dataKey).assign({key : value}).write();
  }