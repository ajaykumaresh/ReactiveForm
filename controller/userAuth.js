const userRole = require('../model/userRole');

exports.addUser = (req, res) => {
  
console.log(req.body)
    userRole.findOne({
        email: `${req.body.email}`
    }).then((user, err) => {
        if (err) {
            res.status(400).json({status:400,msg:err})
        } else if (user) {
            res.status(400).json({status:400,msg:'User already exists'})
        } else {
            let {
                name,
                phonenumber,
                dob,
                address,
                Education,
                Career,
                email
            } = req.body;

            let data = {
                email,
                phonenumber,
                name,
                dob,
                address,
                Education,
                Career
            }
            let userModel = new userRole(data);
            userModel
                .save()
                .then(sucess => {
                    console.log(sucess);
                   res.status(200).json({status:200,msg:sucess})
                })
                .catch(err => {
                    res.status(400).json({status:400,msg:"Could Not Add User"}) 
                });
            console.log(user)
        }
    })

};
