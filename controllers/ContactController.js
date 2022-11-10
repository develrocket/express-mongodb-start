const ContactModel = require('../models/contact');

module.exports = function () {
    return {
        doCreate: async function(req, res) {
            let {name, email, subject, content} = req.body;

            let contact = new ContactModel({
                name,
                email,
                subject,
                content
            });

            await contact.save();

            return res.json({result: 'success'});
        }
    }
}