const admin = require("firebase-admin");
const util = require("./util.js");

/**
 * PROJRECT CREATE
 */
module.exports = (doc) => {
  const project = doc.data();
  const notification = {
    content: "Added a new project",
    user: `${project.authorFirstName} ${project.authorLastName}`,
    time: admin.firestore.FieldValue.serverTimestamp(),
  };
  return util.createNotification(notification);
};
