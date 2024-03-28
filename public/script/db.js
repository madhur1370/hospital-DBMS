window.addEventListener('load', () => {


    function displaydata(obj,heading) {

        if (obj.length == 0)
            return;
        var a = obj[0];
        var rem = document.querySelector('.displaydata');
        var t1=rem.firstElementChild
        var t2=t1.nextElementSibling;
        rem.classList.remove('hide');
        t1.innerHTML=`${heading}`;
        rem.removeChild(t2);
        var table=document.createElement('table');
        rem.appendChild(table);
        var el = document.createElement('tr');
        el.classList.add('tr');
        el.style.fontSize='20px';
        el.style.fontWeight='bolder';
        table.appendChild(el);
        table.classList.add('table');
        table.style.border='2px solid black';
        for (let i in a) {
            var td = document.createElement('td');
            el.appendChild(td);
            td.innerHTML = `${i}`;
        }
        obj.forEach(e => {
            var ele = document.createElement('tr');
            table.appendChild(ele);
            for (let i in e) {
                let td = document.createElement('td');
                ele.appendChild(td);
                td.innerHTML = `${e[i]}`;
            }
        });

    };

    function profset(data)
    {
        var name = document.querySelector('#Name');
        var age = document.querySelector('#Age');
        var sex = document.querySelector('#gender')
        var phone = document.querySelector('#Phone')
        var password = document.querySelector('#Password');
        var address = document.querySelector('#Address')
        var email = document.querySelector('#Email');
        name.value=`${data.name}`;
        age.value=`${data.age}`;
        sex.value=`${data.gender}`
        phone.value=`${data.phoneno}`;
        password.value=`${data.password}`;
        address.value=`${data.address}`;
        email.value=`${data.email}`;

    }



    var welcome = document.querySelector('.name');
    welcome.innerHTML = `Welcome: ${sessionStorage.name}`;
    if (sessionStorage.name != null) {
        var logout = document.querySelector('.logout');
        logout.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = '/';
        });




        //profile 
        var profile=document.querySelector('.profile');
        profile.addEventListener('click',()=>{
            var t1=document.querySelector('.displaydata');
            t1.classList.add('hide');
            hide('');
            var t=document.querySelector('.edituser');
            t.classList.remove('hide');
            var btn=document.querySelector('.EDIT');
            btn.classList.add('hide');
            var content = {
                id: sessionStorage.id
            }
            var option = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(content)
            };
            fetch('/profile', option)
                .then(res => res.json())
                .then(data => {
                    profset(data[0]);
                })
        });



        //edit profile
        var edit=document.querySelector('.editprofile');
        edit.addEventListener('click',()=>{
            var t1=document.querySelector('.displaydata');
            t1.classList.add('hide');
            hide('');
            profile.click();
            var btn=document.querySelector('.EDIT');
            btn.classList.remove('hide');
            btn.addEventListener('click',()=>{
                var t = document.querySelector(`.edituser`);
                var name = document.querySelector('#Name');
                var age = document.querySelector('#Age');
                var sex = document.querySelector('#gender')
                var phone = document.querySelector('#Phone')
                var password = document.querySelector('#Password');
                var address = document.querySelector('#Address')
                var email = document.querySelector('#Email');
                var content = {
                    id:sessionStorage.id,
                    name: name.value,
                    age: age.value,
                    gender: sex.value,
                    address: address.value,
                    email: email.value,
                    phoneno: phone.value,
                    password: password.value
                };
                var object = {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(content)
                }
                fetch('/editprofile', object)
                    .then(res => res.json())
                    .then(data => {
                        alert(data.key);
                        t.classList.add('hide');
                    });
                btn.classList.add('hide');
            });

        });





        const a = [['a1', 'adduser'], ['a2', 'removeuser'], ['a4', 'addrooms'], ['a5', 'updatecabin']];


        function hide(h) {
            for (let i = 0; i < a.length; i++) {
                if (h == a[i][1])
                    continue;
                var t = document.querySelector(`.${a[i][1]}`);
                t.classList.add('hide');
            }
        }

        function disphide()
        {
            var t=document.querySelector('.displaydata');
            t.classList.add('hide');
        }

        a.forEach((e) => {
            var v = document.querySelector(`.${e[0]}`);
            v.addEventListener('click', () => {
                var t=document.querySelector('.edituser');
                t.classList.add('hide');
                hide(e[1]);
                disphide();
                var d = document.querySelector(`.${e[1]}`);
                d.classList.remove('hide');
                v.classList.add('re');
                setTimeout(() => {
                    v.classList.remove('re');
                }, 200);
            });
        });



        const update = document.querySelector('.cabin');
        const addroom = document.querySelector('.addroom');
        const add = document.querySelector('.add');
        const remove = document.querySelector('.remove');




        //update doctors cabin number
        update.addEventListener('click', () => {
            var t = document.querySelector(`.updatecabin`);
            t.classList.add('hide');
            var docid = document.querySelector('#doctorid');
            var roomno = document.querySelector('#cabin');
            var content = {
                docid: docid.value,
                roomno: roomno.value
            };
            var object = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(content)
            }
            fetch('/updatecabin', object)
                .then(res => res.json())
                .then(data => {
                    alert(data.key);
                });
        });





        //remove user from  database
        remove.addEventListener('click', () => {
            var t = document.querySelector(`.removeuser`);
            t.classList.add('hide');
            var userid = document.querySelector('#userid');
            var content = {
                userid: userid.value
            };
            var object = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(content)
            }
            fetch('/removeuser', object)
                .then(res => res.json())
                .then(data => {
                    alert(data.key);
                });
        });




        //add user to database like doctor,pharmacist,receptionist and database user
        add.addEventListener('click', () => {
            var t = document.querySelector(`.adduser`);
            t.classList.add('hide');
            var id = document.querySelector('#uid');
            var username = document.querySelector('#username');
            var name = document.querySelector('#name');
            var age = document.querySelector('#age');
            var sex = document.querySelector('#sex')
            var usertype = document.querySelector('#usertype')
            var phone = document.querySelector('#phone')
            var password = document.querySelector('#password');
            var address = document.querySelector('#address')
            var email = document.querySelector('#email');
            var content = {
                id: id.value,
                username: username.value,
                name: name.value,
                age: age.value,
                gender: sex.value,
                address: address.value,
                email: email.value,
                usertype: usertype.value,
                phoneno: phone.value,
                password: password.value
            };
            var object = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(content)
            }
            fetch('/adduser', object)
                .then(res => res.json())
                .then(data => {
                    alert(data.key);
                });
        });



        //add rooms from database
        addroom.addEventListener('click', () => {
            var t = document.querySelector(`.addrooms`);
            t.classList.add('hide');
            var roomno = document.querySelector('#roomno');
            var roomtype = document.querySelector('#roomtype');
            var available_beds = document.querySelector('#beds');
            var content = {
                roomno: roomno.value,
                available_beds: available_beds.value,
                roomtype: roomtype.value
            };
            var object = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(content)
            }
            fetch('/addrooms', object)
                .then(res => res.json())
                .then(data => {
                    alert(data.key);
                });
        });


        //see roooms list
        var rooms=document.querySelector('.a6');
        rooms.addEventListener('click',()=>{
            hide('');
            rooms.classList.add('re');
            setTimeout(() => {
                rooms.classList.remove('re');
            }, 200);
            fetch('/availablerooms')
            .then(res=>res.json())
            .then(data=>{
                displaydata(data,'rooms data')
            })
        });

        //remove old records
        
    }
    else
        alert('login first');


});