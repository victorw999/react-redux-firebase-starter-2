const admin = require("firebase-admin");

/**
 *  CREATE NOTIFICATION
 */
exports.createNotification = (notification) => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then((doc) => {
      console.log("notification added", doc);
    })
    .catch((error) => {
      console.log("cloudfunc createNotification err", error);
    });
};
