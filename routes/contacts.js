const express = require("express");
const router = express.Router();
const { ContactModel, sortContacts, filterContacts, Pager } = require("@jworkman-fs/asl");

let contacts = ContactModel.index();

router.get("/", (req, res) => {
    let results = [...contacts];

    const filterBy = req.get("X-Filter-By");
    const filterOp = req.get("X-Filter-Operator");
    let filterValue = req.get("X-Filter-Value");

    if (filterBy === "id") {
        filterValue = Number(filterValue);
    }

    if (filterBy && filterOp && filterValue) {
        try {
            results = filterContacts(filterBy, filterOp, filterValue, results);
        } catch (error) {
            console.error("❌ Filtering error:", error.message);
            if (error.name === "NoContactsFoundError") {
                return res.status(404).json({ message: "No contacts found matching the filter." });
            }
            if (error.name === "InvalidContactSchemaError") {
                return res.status(400).json({ message: `Invalid filter field: "${filterBy}". Allowed fields: id, fname, lname, email, phone, birthday.` });
            }

            return res.status(400).json({ message: "Filtering error: " + error.message });
        }
    }

    if (req.query.sort) {
        try {
            results = sortContacts(results, req.query.sort, req.query.direction || "asc");
        } catch (error) {
            return res.status(400).json({ message: "Sorting error: " + error.message });
        }
    }


    const page = Number(req.query.page) || 1;
    const size = Number(req.query.limit) || 10;

    const pager = new Pager(results, req.query.page, size);

    res.set("X-Page-Total", pager.pages);
    res.set("X-Page-Next", pager.next());
    res.set("X-Page-Prev", pager.prev());

    res.json(pager.results());
});

router.get("/:id", (req, res) => {
    try {
        const contact = ContactModel.show(Number(req.params.id));
        res.json(contact);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

router.post("/", (req, res) => {
    try {
        const newContact = ContactModel.create(req.body);
        res.status(303).location(`/v1/contacts/${newContact.id}`).json(newContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/:id", (req, res) => {
    try {
        const updatedContact = ContactModel.update(Number(req.params.id), req.body);
        res.json(updatedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", (req, res) => {
    try {
        ContactModel.remove(Number(req.params.id));
        res.json({ message: "Contact deleted" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;

