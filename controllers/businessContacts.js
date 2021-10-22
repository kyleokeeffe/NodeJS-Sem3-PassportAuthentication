// Connect the model
// const businessContacts = require('../models/businessContacts');

let BusinessContacts = require('../models/businessContacts');


//method copied directly from Week 6 - Authentication example project
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/login');
    }
    next();
}


module.exports.list = function(req, res, next) {
    BusinessContacts.find(
        (err, businessContactsList)=>{
          if(err){
            return console.error(err);
          }else{
            // console.log("got it");
              res.render('businessContacts/list', { title: 'Business Contacts',
              BusinessContactsList: businessContactsList,
              userName: req.user ? req.user.username : '' });
            
          }
        }
    );
}



module.exports.displayEdit = function(req,res,next){
    let id = req.params.id;

    BusinessContacts.findById(id, (err,businessContactToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.render('businessContacts/add_edit', {
                title: "Edit Business Contact",
                BusinessContact: businessContactToEdit,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}

module.exports.processEdit = function(req,res,next){
    let id = req.params.id;

    let updatedBusinessContact = BusinessContacts({
        _id:req.body.id,
        name: req.body.name,
        telephone: req.body.telephone,
        email: req.body.email

    });

    BusinessContacts.updateOne({_id: id}, updatedBusinessContact, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/businessContacts/list');
        }
    });

}

module.exports.displayAdd = function(req,res,next){
    let newBusinessContact = BusinessContacts();

    res.render('businessContacts/add_edit',{
        title: 'Add new Business Contact',
        BusinessContact: newBusinessContact,
        userName: req.user ? req.user.username : ''
})
}

module.exports.processAdd = function(req,res,next){
    let newBusinessContact = BusinessContacts({

  
        _id:req.body.id,
        name: req.body.name,
        telephone: req.body.telephone,
        email: req.body.email

    });

    BusinessContacts.create(newBusinessContact, (err, createdContact) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            console.log(createdContact);
            res.redirect('/businessContacts/list');
        }
    });

}


module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    businessContacts.remove({_id: id}, (err) => {
        if(err){

        }else{
            res.redirect('/businessContacts/list');
        }
    })
}