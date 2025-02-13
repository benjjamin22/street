var express = require('express');
var fs = require ( 'fs') ;
var router = express.Router();




const accounts = JSON.parse(fs.readFileSync('./data.json','utf-8'));

router.get('/', function handler(req, res,next) {
    
    try{
        const id = req.params.id;
        const foundUser = accounts.find((data) => id === data.id );
        if (foundUser ) {
            //req.session.user = foundUser.pine;
                res.render('idslip',{Name:foundUser.Aname.Name,Mname:foundUser.Aname.Mname,Surname:foundUser.Aname.Surname,
                    NIN:foundUser.NIN,Gender:foundUser.Gender,Day:foundUser.Ddateofbirth.Day,Month:foundUser.Ddateofbirth.Month,
                    Year:foundUser.Ddateofbirth.Year,Presentclass:foundUser.Presentclass,Bloodgroup:foundUser.Bloodgroup,
                    State:foundUser.State,School:foundUser.School,HometownCommunity:foundUser.HometownCommunity,
                    ParentPhoneNo:foundUser.ParentPhoneNo,ParentPhoneNo2:foundUser.ParentPhoneNo2,Picturepath:foundUser.client,
                    Status:foundUser.Status,id:foundUser.id,Status:foundUser.Status,time:foundUser.time});
            } else {
                res.render('ddx');
            }
       
    } catch{
        res.send("Internal server error");
        
    }
});

module.exports = router;
