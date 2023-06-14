const { invokeAction } = require("./contacts");
const { argv } = require("yargs");
const { action, id, name, email, phone } = argv;
invokeAction({ action, id, name, email, phone });
