window.addEventListener('load', () => {
    const a = ['table', 'search'];
    var a1;
    var a2;
    var a4;
    function displaydata(t) {
        const hide = document.querySelector(`.${a[1]}`);
        const nohide = document.querySelector(`.${a[0]}`);
        hide.classList.add('hide');
        nohide.classList.remove('hide');
        t.classList.add('re');
        setTimeout(() => {
            t.classList.remove('re');
        }, 200);



        if (t == a1) {
            var content = { id: sessionStorage.id }
            var option = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(content)
            };
            fetch('/appointments', option)
                .then(res => res.json())
                .then(data => {
                    tabulardata(data);
                })
        }
        else if (t == a2) {
            console.log('2');
            fetch('/checkedpatient')
                .then(res => res.json())
                .then(data => {
                    tabulardata(data);
                })
        }
        else if (t == a4) {
            console.log('4');
            fetch('/admittedpatient')
                .then(res => res.json())
                .then(data => {
                    tabulardata(data);
                })

        }
        else {
            console.log('bhia bhai');
        }
    }



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

    function tabulardata(obj) {
        var a = obj[0];
        var rem = document.querySelector('.left');
        rem.classList.remove('hide');
        rem.removeChild(rem.firstElementChild.nextElementSibling);
        var table = document.createElement('table');
        rem.appendChild(table);
        table.classList.add('table');
        var el = document.createElement('tr');
        el.classList.add('tr');
        table.appendChild(el);
        for (let i in a) {
            var td = document.createElement('td');
            el.appendChild(td);
            td.innerHTML = `${i}`;
        }
        obj.forEach(e => {
            var ele = document.createElement('tr');
            var t = 0;
            var tempid;
            table.appendChild(ele);
            for (let i in e) {
                if (t === 0) {
                    t = 1;
                    tempid = e[i];
                }
                if (i === 'status') {
                    let td = document.createElement('td');
                    ele.appendChild(td);
                    if (e[i] === "0") {
                        td.classList.add('notcheck');
                        td.innerHTML = `not checked`;
                        td.addEventListener('click', () => {
                            td.classList.remove('notcheck');
                            td.classList.add('check');
                            td.innerHTML = 'checked';
                            var content = { pid:tempid}
                            var option = {
                                method: 'POST',
                                headers: { 'content-type': 'application/json' },
                                body: JSON.stringify(content)
                            };
                            fetch('/patientchecked', option)
                        });
                    }
                    else {
                        td.classList.add('check');
                        td.innerHTML = `checked`;
                    }
                    continue;
                }
                let td = document.createElement('td');
                ele.appendChild(td);
                td.innerHTML = `${e[i]}`;
            }
        });

    }
    //welcoming name
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


        const btn1 = document.querySelector('.todayappoint');
        const btn2 = document.querySelector('.checked');;
        const btn3 = document.querySelector('.patientdetails');;
        const btn4 = document.querySelector('.admit');
        a1 = btn1;
        a2 = btn2;
        a4 = btn4;
        btn1.addEventListener('click', () => { displaydata(btn1) });
        btn2.addEventListener('click', () => { displaydata(btn2) });
        btn4.addEventListener('click', () => { displaydata(btn4) });
        btn3.addEventListener('click', () => {
            const hide = document.querySelector(`.${a[0]}`);
            const nohide = document.querySelector(`.${a[1]}`);
            hide.classList.add('hide');
            nohide.classList.remove('hide');
            btn3.classList.add('re');
            setTimeout(() => {
                btn3.classList.remove('re');
            }, 200);
        });
        const search = document.querySelector('.sp');
        search.addEventListener('click', () => {
            var name = document.querySelector('#pname');
            var phone = document.querySelector('#phone');
            var content = {
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
                    tabulardata(data);
                })
        });
    }
    else {
        alert('login first');
    }
});