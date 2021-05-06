
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');
var jwt = require('jsonwebtoken');
const session = require('express-session');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');


// vendor / customer/ and himself (super admin) CRUD
// products/ menu/ categories orders(vendor/restaurant)

router.get('/all_restuarant', (req,res)=>{

	if(typeof req.session.admin)
	{
		
		datb.query('SELECT * FROM restuarant',function(error,results,fields){
	 
			if(error)
			{
				res.send({"failed":"error occurred"})
			}
			else{
						console.log(req.session.admin);
						
					   return res.send({data:results})
				}

		});
	}else{
		 res.send({"failed":"try to log in first"})
		 console.log(req.session.admin)
	}
});


router.get('/all_customers', (req,res)=>{


	if(typeof req.session.admin)
	{
		datb.query('SELECT * FROM customer',function(error,results,fields){
	 
			if(error)
			{
				res.send({"failed":"error occurred"})
			}
			else{
						console.log(req.session.superAdmin)
					   return res.send({data:results})
				}

		});
	}else{
		
		 res.send({"failed":"try to log in first"})
		 
	}
});



//done

  router.put('/restu_update/:id', (req,res)=>{
    let restuarant ={ 
      status:req.body.status
          
    }
    //let email = (req.body.email)  
    datb.query('UPDATE restuarant SET status = "'+ req.body.Status + '" WHERE restuarant_id = ?',[req.params.id],function (error, results, fields)
    {
        if (error) throw error 
        else{
          datb.query('select * from restuarant where restuarant_id = ?',[req.params.id],function (error, results, fields){
              return res.send({results})
          })
      
          }
    })

})

router.delete('/restuarant/:id',function(req, res){
   
    datb.query('DELETE FROM restuarant WHERE restuarant_id = ?',[req.params.id], (err,results,fields)=>{
        if(!err)
		{
			res.send('Deleted successfully.');
		}else{
			console.log(err)
		}
    }); 
})




router.put('/cust_update', (req,res)=>{
        let cust ={ 
            customer_ID:req.body.customer_ID,
            name:req.body.name,
            surname:req.body.surname,
            email_address:req.body.email_address,
            cell_no:req.body.cell_no,
            password:req.body.password    
           }
      let email_address = (req.body.email_address)
           
        datb.query('UPDATE customer SET ? where email_address = "'+email_address+'"',[cust],function (error, results, fields)
        {
            if (error) throw error;
            else
            {
              datb.query('select * from customer where email_address = "'+email_address+'"',[cust],function (error, results, fields){
              return res.send({results})
          })
        }       
          })
        })
    
        router.delete('/customer/:id',function(req, res){
   
            datb.query('DELETE FROM customer WHERE customer_ID = ?',[req.params.id], (err,results,fields)=>{
                 
              if(!err){
                res.send('Deleted successfully.');
            }else{
                console.log(err)
            }
            }); 
        });

module.exports = router;