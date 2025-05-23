// Contains logic for handling requests like GET, POST, PUT, DELETE


const Contact = require("../models/Contact")
const asyncHandler = require("express-async-handler");
// @desc Get all contacts
// @route GET /api/contacts
// @access public

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// @desc Create all contacts
// @route POST /api/contacts
// @access public

const createContact = asyncHandler(async (req, res) => {
        const {name, email, phone, designation} = req.body;
        if(!name || !email || !phone || !designation) {
            res.status(400);
            throw new Error("All fileds are required!");
        }
        const contact = await Contact.create({name, email, phone, designation});
        res.status(201).json(contact);
});

// @desc Get single contact
// @route GET /api/contacts/:id
// @access public

const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }
    res.status(200).json(contact);
});

// @desc Update Contacts
// @route PUT /api/contacts/:id
// @access public

const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found!");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedContact);
});

// @desc Delete Contacts
// @route DELETE api/contacts/:id
// @access public

const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found!");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});
module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };