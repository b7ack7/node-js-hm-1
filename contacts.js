const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function loadContacts() {
  const contactsData = fs.readFileSync(contactsPath, "utf-8");
  return JSON.parse(contactsData);
}

function saveContacts(contacts) {
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
}

function listContacts() {
  const contacts = loadContacts();
  console.table(contacts);
}

function getContactById(contactId) {
  const contacts = loadContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (contact) {
    console.log(contact);
  } else {
    console.log("Contact not found.");
  }
}

function removeContact(contactId) {
  const contacts = loadContacts();
  const updatedContacts = contacts.filter((c) => c.id !== contactId);
  if (updatedContacts.length === contacts.length) {
    console.log("Contact not found.");
  } else {
    saveContacts(updatedContacts);
    console.log("Contact removed successfully.");
  }
}

function addContact(name, email, phone) {
  const contacts = loadContacts();
  const newContact = { id: generateId(), name, email, phone };
  contacts.push(newContact);
  saveContacts(contacts);
  console.log("Contact added successfully.");
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function invokeAction({ action, id, name, email, phone }) {
  if (action === "list") {
    listContacts();
  } else if (action === "get") {
    getContactById(id);
  } else if (action === "add") {
    addContact(name, email, phone);
  } else if (action === "remove") {
    removeContact(id);
  } else {
    console.log("Unknown action. Please try again.");
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  invokeAction,
};
