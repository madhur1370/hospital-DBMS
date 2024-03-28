const db=require("./database.js");
const express=require("express");
const path=require("path");
const app=express();
app.use(express.json());
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));


app.listen(5500);
db.connect();


app.post('/login',(req,res)=>{
    var data=req.body;
    var usertype=req.body.usertype;
    if(usertype==='database admin')
    usertype='dbuser'

    db.query("select * from usertype where username=? and usertype=? and password=?",[data.username,usertype,data.password],(err,result)=>{
        if(err||result.length===0||result.length>1)
        res.end(JSON.stringify({key:'incorrect'}));
        else
        {
            res.end(JSON.stringify({key:'correct',id:`${result[0].id}`}));
        }
    });
});
app.get('/user',(req,res)=>{
    if(req.query.usertype==='receptionist')
    res.sendFile(path.join(__dirname,'/public/html/receptionist.html'));
    else if(req.query.usertype==='dbuser')
    res.sendFile(path.join(__dirname,'/public/html/databaseAdmin.html'));
    else if(req.query.usertype==='doctor')
    res.sendFile(path.join(__dirname,'/public/html/doctor.html'));
    else if(req.query.usertype==='pharmacist')
    res.sendFile(path.join(__dirname,'/public/html/pharmacist.html'));
    else
    res.json('not allowed');

});



//profile sending 

app.post('/profile',(req,res)=>{
    db.query(`select * from usertype where id='${req.body.id}'`,(e1,r1)=>{
        if(!e1)
        res.json(r1);
    });
});

//edit

app.post('/editprofile',(req,res)=>{
    console.log(req.body);
    db.query(`update usertype set name='${req.body.name}',age='${Number(req.body.age)}',gender='${req.body.gender}', phoneno='${Number(req.body.phoneno)}',address='${req.body.address}',email='${req.body.email}',password='${req.body.password}' where id='${req.body.id}'`,(e1,r1)=>{
        if(!e1)
        res.end(JSON.stringify({key:'updated successfully'}));
        else
        res.end(JSON.stringify({key:'update error'}));

    });
});


// doctor
// doctor
// doctor
// doctor
// doctor 
 




//todays appointments list

app.post('/appointments',(req,res)=>{
    db.query(`select b.pid as patient_id,a.name as name,a.age as age,a.sex as sex,b.status as status from patient as a inner join appointment as b on b.pid=a.patient where b.did='${req.body.id}' and b.status='0';`,(err,result)=>{
        if(!err)
        res.json(result);
        else
        res.json('server error');
    })
});



//patient checked

app.post('/patientchecked',(req,res)=>{
    console.log(req.body);
    db.query(`update appointment set status='1' where pid=${Number(req.body.pid)}` ,(err,result)=>{

    })
})




//ADD PATIENT
app.post('/addpatient',(req,res)=>{
    const body=req.body;
    body.phone=Number(body.phone);
    body.age=Number(body.age);
    db.query(`INSERT INTO patient (name,age,sex,phone,recent_visit) values('${body.name}',${body.age},'${body.sex}',${body.phone},current_date())`,(err,result)=>{
        if(!err)
        res.end(JSON.stringify({key:'added'}));
        else
        res.end(JSON.stringify({key:'already exist'}));
    });
});



//patient list that are checked by doctor current day

app.get('/checkedpatient',(req,res)=>{
    db.query(`select * from appointment where date=current_date() and status='1'`,(err,result)=>{
        if(!err)
        res.json(result);
        else
        res.json('server error');
    })

});









// receptionist
// receptionist
// receptionist
// receptionist
// receptionist





//DOCTOR DETAIL
app.get('/doctordetails',(req,res)=>{
    db.query('select b.id as doc_id,b.name as name,a.cabinno as cabin,a.speciality as speciality from doctor as a inner join usertype as b on a.docid=b.id',(err,result)=>{
        res.json(result); 
    })
});



//SEARCH PATIENT
app.post('/searchpatient',(req,res)=>{
    const body=req.body;
    body.phone=Number(body.phone);
    db.query('select * from patient where name=? and phone=?',[body.name,body.phone],(err,result)=>{
        if(!err&&result.length==1)
        {
            res.json(result);
        } 
        else
        {
            res.json('patient not found');
        }
    });
});





//scedule appointment

app.post('/schedule',(req,res)=>{
    const body=req.body;
    body.phone=Number(body.phone);
    db.query('select * from patient where phone=?',[body.phone],(err,result)=>{
        
        if(!err&&result.length===1)
        {
            body.pid=result[0].patient;
            delete body.phone;
            db.query(`update patient set recent_visit=currentdate() where phone=${body.phone}`,(e1,r1)=>{
                if(!e1)
                console.log('updated');
                else
                console.log('not updated');
            });
            db.query('INSERT INTO appointment SET?',body,(e1,r1)=>{
                if(e1)
                {
                    res.end(JSON.stringify({key:'patient already scheduled'}));
                }
                else
                res.end(JSON.stringify({key:'scheduled'}));

            })
        }
        else
        {
            res.json('first add patient then schedule it');
        }
    });
});


//admitted patient list

app.get('/admittedpatient',(req,res)=>{
    console.log('assasa')
    db.query('select b.pid as patient_id,a.name as patient_name,a.age as age,a.sex as sex,a.phone as phone,b.roomno as room_no from patient as a inner join admitted as b on b.pid=a.patient',(err,result)=>{
        if(!err)
        res.json(result);
        else
        res.json('server error');
    })

});


//admit patient
app.post('/admitpatient',(req,res)=>{
    db.query(`select * from room where roomtype='${req.body.roomtype}' and available_beds>0 limit 1 `,(err,result)=>{
        if(!err && result.length==1)
        {
            db.query(`select patient from patient where phone=${Number(req.body.phone)} and name='${req.body.name}'`,(err,r1)=>{
                if(!err)
                {
                    db.query(`update room set available_beds=available_beds - 1 where roomno=${result[0].roomno}`);
                    db.query(`insert into admitted values (${r1[0].patient},${result[0].roomno})`);
                    res.end(JSON.stringify({key:'admitted'}));
                }
                else
                {
                    res.end(JSON.stringify({key:'not admitted'}));
                }
            });
        }
        else
        {
            res.end(JSON.stringify({key:'rooms not available'}));
        }
    });
});

//available rooms

app.get('/availablerooms',(req,res)=>{
    db.query('select roomno,roomtype,available_beds from room where available_beds>0 order by roomtype ASC',(err,result)=>{
        if(!err)
        res.json(result);
        else
        res.json('server error');
    });
});


//discharge patient

app.post('/dischargepatient',(req,res)=>{
    req.body.pid=Number(req.body.pid);
    db.query(`select * from admitted where pid=${req.body.pid} limit 1`,(err,result)=>{
        if(result.length==1)
        {
            db.query(`delete from admitted where pid=${req.body.pid} and roomno=${result[0].roomno}`,(err,r2)=>{
                console.log(err);
            });
            db.query(`update room set available_beds=available_beds + 1 where roomno=${result[0].roomno}`,(err,result1)=>{
                if(!err)
                {
                    res.end(JSON.stringify({key:'disharged'}));
                }
                else
                {
                    res.end(JSON.stringify({key:' not disharged'}));
                }
            });
        }
        else
        res.end(JSON.stringify({key:' error'}));
    });
});





// pharmacist
// pharmacist
// pharmacist
// pharmacist
// pharmacist





// medicnes available

app.get('/medicines',(req,res)=>{
    db.query('select med_id,medname as name,quantity from pharmacy',(err,result)=>{
        if(!err)
        res.json(result)
        else
        res.end(JSON.stringify({key:'pharmacy error'}));
    });
});

//Add medicines

app.post('/addmedicine',(req,res)=>{
    db.query(`select * from pharmacy where medname='${req.body.name}'` ,(err,result)=>{
        if(result.length===0)
        {
            db.query(`insert into pharmacy (medname,quantity) values('${req.body.name}',${Number(req.body.quantity)})`,(e1,r1)=>{
                if(!e1)
                res.end(JSON.stringify({key:'Added Medicine'}));
                else
                res.end(JSON.stringify({key:'not added'}));
            });
        }
        else
        {
            db.query(`update pharmacy set quantity=quantity+${Number(req.body.quantity)}`,(e1,r1)=>{
                if(!e1)
                res.end(JSON.stringify({key:'Medicine quantity updated'}));
                else
                res.end(JSON.stringify({key:'not updated'}));
            });
        }
    });
});


// search medicine

app.post('/searchmedicine',(req,res)=>{
    db.query(`select med_id as medicine_id,medname as medicine_name,quantity from pharmacy where medname='${req.body.name}'`,(err,result)=>{
        
        if(!err)
        res.json(result);
        else
        res.end(JSON.stringify({key:'not available'}));
    });
});


//generate bill

app.post('/addmedbill',(req,res)=>{
    db.query(`select * from pharmacy where medname='${req.body.name}'and quantity>=${Number(req.body.quantity)}`,(err,result)=>{
        
        if(result.length===1)
        {
            db.query(`update pharmacy set quantity=quantity-${Number(req.body.quantity)}`,(e1,r1)=>{
                if(e1)
                res.end(JSON.stringify({key:'not done'}));
                else
                res.end(JSON.stringify({key:'done',price:result[0].price}));
            });
        }
        else
        res.end(JSON.stringify({key:'medicne not available'}));
    });
});






//  database user 
//  database user 
//  database user 
//  database user 
//  database user 



//add user
app.post('/adduser',(req,res)=>{
    req.body.phoneno=Number(req.body.phoneno);
    req.body.age=Number(req.body.age);
    db.query('insert into usertype set ?',req.body,(err,result)=>{
        console.log(err)
        if(!err)
        {
            res.end(JSON.stringify({key:"user is successfully added"}));
        }
        else
        res.end(JSON.stringify({key:'user id alredy exist'}));
    }); 
});

//remove user 

app.post('/removeuser',(req,res)=>{
    if(req.body.userid==='0')
    res.end(JSON.stringify({key:'cannot delete root'}));
    db.query(`delete from usertype where id='${req.body.userid}'`,(err,result)=>{
        if(!err)
        {
            db.query(`delete from doctor where docid='${req.body.userid}'`,(e1,r1)=>{
                res.end(JSON.stringify({key:'user removed'}));
            });
        }
        else
        res.end(JSON.stringify({key:'user id not exist'}));
    }); 
});


//add rooms
app.post('/addrooms',(req,res)=>{
    db.query('insert into room set?',req.body,(err,result)=>{
        if(!err)
        res.end(JSON.stringify({key:"room is successfully added"}));
        else
        res.end(JSON.stringify({key:"room already exist"}));
    });
});

//update cabin of doctor
app.post('/updatecabin',(req,res)=>{
    console.log(req.body);
    db.query(`select * from doctor where cabinno=${Number(req.body.roomno)}`,(err,result)=>{
        if(err)
        res.end(JSON.stringify({key:"cabin already assingned to other doctor"}));
        else{
            db.query(`select * from room where roomtype='cabin' and roomno=${Number(req.body.roomno)}`,(e1,r1)=>{
                if(r1.length==1)
                {
                    db.query(`update doctor set cabinno=${Number(req.body.roomno)} where docid='${req.body.docid}'`,(e2,r2)=>{
                        if(!e2)
                        res.end(JSON.stringify({key:'room assigned to doctor successfully'}));
                        else
                        res.end(JSON.stringify({key:'room assigned failed'}));
                    });
                }
                else
                {
                    res.end(JSON.stringify({key:"cabin not exist: first insert cabin to room"}));
                }
            });
        }
    });
});

