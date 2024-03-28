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

    const a = [['a1', 'addpatient'], ['a2', 'displaydata'], ['a3', 'search'],['a4','appointment'],['a5','admit'],['a7','discharge']];

    function hide(h) {
        for (let i=0;i<a.length;i++) {
            if(h==a[i][1])
            continue;
            var t = document.querySelector(`.${a[i][1]}`);
            t.classList.add('hide');
        }
    }

    a.forEach((e) => {
        var v = document.querySelector(`.${e[0]}`);
        v.addEventListener('click', () => {
            var t=document.querySelector('.edituser');
            t.classList.add('hide');
            hide(e[1]);
            var d = document.querySelector(`.${e[1]}`);
            d.classList.remove('hide');
            v.classList.add('re');
            setTimeout(() => {
                v.classList.remove('re');
            }, 200);
        });
    })




    function profset(data)
    {
        var name = document.querySelector('#Name');
        var age = document.querySelector('#Age');
        var sex = document.querySelector('#gender')
        var phone = document.querySelector('#Phone')
        var password = document.querySelector('#password');
        var address = document.querySelector('#address')
        var email = document.querySelector('#email');
        name.value=`${data.name}`;
        age.value=`${data.age}`;
        sex.value=`${data.gender}`
        phone.value=`${data.phoneno}`;
        password.value=`${data.password}`;
        address.value=`${data.address}`;
        email.value=`${data.email}`;

    }



    var clickhide = document.querySelector('nav');
    clickhide.addEventListener('click', () => {
        hide('');
    })



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
            profile.click();
            var btn=document.querySelector('.EDIT');
            btn.classList.remove('hide');
            btn.addEventListener('click',()=>{
                var t = document.querySelector(`.edituser`);
                var name = document.querySelector('#Name');
                var age = document.querySelector('#Age');
                var sex = document.querySelector('#gender')
                var phone = document.querySelector('#Phone')
                var password = document.querySelector('#password');
                var address = document.querySelector('#address')
                var email = document.querySelector('#email');
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




        //add patient

        var ap = document.querySelector('.ap');
        ap.addEventListener('click', () => {
            var name = document.querySelector('#patientname');
            const age = document.querySelector('#patientage');
            const sex = document.querySelector('#gender');
            var phone = document.querySelector('#patientno');
            var content = {
                name: name.value,
                age: age.value,
                sex: sex.value,
                phone: phone.value
            }
            var option = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(content)
            };
            fetch('/addpatient', option)
                .then(res => res.json())
                .then(data => {
                    if (data.key === 'added')
                        window.alert('patient added');
                    else
                        window.alert('patient elready exist ');
                })
        })






        //schedule appointment

        var schedule = document.querySelector('.appoint');
        schedule.addEventListener('click', () => {
            var phone = document.querySelector('#phonenum');
            var did = document.querySelector('#did');
            var date=document.querySelector('#date')
            var content = {
                phone: phone.value,
                did: did.value,
                date:date.value
            }
            var option = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(content)
            };
            fetch('/schedule', option)
                .then(res => res.json())
                .then(data => {
                    alert(data.key);
                })
        })





        //search patient

        var searchbtn = document.querySelector('.sp');
        searchbtn.addEventListener('click', () => {
            var t=document.querySelector('.search');
            t.classList.add('hide');
            var name = document.querySelector('#pname');
            var phone = document.querySelector('#phone');
            content = {
                name: name.value,
                phone: phone.value
            }
            var option = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(content)
            };
            fetch('/searchpatient', option)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    displaydata(data,'patient details');
                })
        });




        //search doctor
        var doctors = document.querySelector('.a2');
        doctors.addEventListener('click', () => {
            var t=document.querySelector('.edituser');
            t.classList.add('hide');
            doctors.classList.add('re');
            setTimeout(() => {
                doctors.classList.remove('re');
            }, 200);
            fetch('/doctordetails')
                .then(res => res.json())
                .then(data => {
                    displaydata(data,'Doctors');
                })
        })





        //admit patient
        var admit = document.querySelector('.admitted');
        admit.addEventListener('click', () => {
            var name = document.querySelector('#name');
            var phone = document.querySelector('#number');
            var roomtype=document.querySelector('#roomtype');
            content = {
                name: name.value,
                phone: phone.value,
                roomtype: roomtype.value
            }
            var option = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(content)
            };
            fetch('/admitpatient', option)
                .then(res => res.json())
                .then(data => {
                    alert(data.key);
                })
        });





        //discharge patient
        var discharge = document.querySelector('.discharged');
        discharge.addEventListener('click', () => {
            var pid = document.querySelector('#patientid');
            content = {
                pid: pid.value
            }
            var option = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(content)
            };
            fetch('/dischargepatient', option)
                .then(res => res.json())
                .then(data => {
                    alert(data.key);
                })
        });







        //available rooms

        var rooms=document.querySelector('.a6');
        rooms.addEventListener('click',()=>{
            var t=document.querySelector('.edituser');
            t.classList.add('hide');
            rooms.classList.add('re');
            setTimeout(() => {
                rooms.classList.remove('re');
            }, 200);
            fetch('/availablerooms')
            .then(res=>res.json())
            .then(data=>{
                displaydata(data,'available roomss');
            });
        });

    }
    else
        alert("please login first");
});