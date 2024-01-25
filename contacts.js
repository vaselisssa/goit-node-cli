const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

//Повертає масив контактів
const listContacts = async () => {
   const data = await fs.readFile(contactsPath, "utf-8");
   return JSON.parse(data);
};

//Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
const getContactById = async (contactId) => {
   const contacts = await listContacts();
   const result = contacts.find((item) => item.id === contactId);
   return result || null;
};

//Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
const removeContact = async (contactId) => {
   const contacts = await listContacts();
   const index = contacts.findIndex((contact) => contact.id === contactId);
   if (index === -1) {
      console.log("No contacts found");
      return null;
   }
   const [result] = contacts.splice(index, 1);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
   return result;
};

//Повертає об'єкт доданого контакту (з id).
const addContact = async (name, email, phone) => {
   const contacts = await listContacts();

   const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
   };
   contacts.push(newContact);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
   return newContact;
};

module.exports = {
   listContacts,
   getContactById,
   removeContact,
   addContact,
};
