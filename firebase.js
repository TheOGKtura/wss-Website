var admin = require("firebase-admin");

var serviceAccount = require("./creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wssthesis-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const database = admin.database()
const auth = admin.auth()
module.exports = { database, auth }