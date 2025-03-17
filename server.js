const express = require("express");
const cors = require("cors");
const { ContactModel, Pager, sortContacts, filterContacts } = require("@jworkman-fs/asl");
const contactRoutes = require("./routes/contacts.js");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/v1/contacts", contactRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

