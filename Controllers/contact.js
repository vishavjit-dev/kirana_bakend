const Contact = require('../Modals/contact');

const usercontacts = async (req, res) => {
    try {
        const contactData = req.body;
        const contact = new Contact(contactData);
        await contact.save();
        res.status(200).json({messages: 'contact send successfully',contact });
    } catch (error) {
        res.status(500).json({messages: 'Error contact send',error });
    }
    
};

// Controller to get all blogs
const getContact = async (req, res) => {
    try {
        const getUserContacts = await Contact.find(); // Use the correct model name
        res.status(200).json(getUserContacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from request parameters
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {usercontacts, getContact, deleteContact};