const admin = require("firebase-admin");
const util = require("./util.js");

/**
 * NEW USER JOIN
 */
module.exports = (user) => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      const newUser = doc.data();
      const notification = {
        content: "Joined the party",
        user: `${newUser.firstName} ${newUser.lastName}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
      };
      return util.createNotification(notification);
    });
};
