const Address = require('../models/address.model');



exports.Create = (req,res) => {
    Address.create({
        profile_pic :req.body.profile_pic,
        status:1
      }).then(user=>{
       console.log(user)
        res.json(
          user
        );
      }).catch(err=>{
        res.status(500).json(err);
      })
}