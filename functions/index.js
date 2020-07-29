const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

/**
 * SPLITTED FUNCTIONS
 */
const projectOnCreate = require("./splitted/projectOnCreate");
const userOnJoined = require("./splitted/userOnJoined");

/**
 * PROJECT CREATE
 */
exports.projectCreated = functions
  .region("us-west2")
  .firestore.document("projects/{projectId}")
  .onCreate(projectOnCreate);

/**
 * NEW USER JOIN
 */
exports.userJoined = functions
  .region("us-west2")
  .auth.user()
  .onCreate(userOnJoined);
