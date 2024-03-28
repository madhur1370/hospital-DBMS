window.addEventListener('load', () => {

    function displaydata(obj, heading) {

        if (obj.length == 0)
            return;
        var a = obj[0];
        var rem = document.querySelector('.displaydata');
        var t1 = rem.firstElementChild
        var t2 = t1.nextElementSibling;
        rem.classList.remove('hide');
        rem.removeChild(t2);
        t1.innerHTML = `${heading}`;
        var table = document.createElement('table');
        rem.appendChild(table);
        var el = document.createElement('tr');
        el.classList.add('tr');
        el.style.fontSize = '20px';
        el.style.fontWeight = 'bolder';
        table.appendChild(el);
        table.style.border = '2px solid black';
        table.classList.add('table');
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

    var welcome = document.querySelector('.name');
    welcome.innerHTML = `Welcome: ${sessionStorage.name}`;
    if (sessionStorage.name != null) {
        var logout = document.querySelector('.logout');
        logout.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = '/';
        });

        const addbill = ['1', '2', '3'];

        var t = document.querySelector('.table2');
        var sr = 1;
        function bills(d) {
            console.log(d[addbill[0]]);
            var b = document.createElement('tr');
            t.appendChild(b);
            var c = document.createElement('td');
            c.innerHTML = `${sr}`;
            sr++;
            b.appendChild(c);

            addbill.forEach(e => {
                var c1 = document.createElement('td');
                c1.innerHTML = `${d[e]}`;
                b.appendChild(c1);
            });
        }

        //generating billllllll

        const a = [['a1', 'addmed'], ['a4', 'searchmed'], ['a3', 'billing']];


        const exp = ['addmed', 'searchmed', 'billing'];
        function hide(e) {
            for (var p = 0; p < exp.length; p++) {
                if (exp[p] === e) {
                    continue;
                }
                let t = document.querySelector(`.${exp[p]}`);
                t.classList.add('hide');
            };
        };






        a.forEach((e) => {
            var v = document.querySelector(`.${e[0]}`);
            v.addEventListener('click', () => {
                var t=document.querySelector('.edituser');
                t.classList.add('hide');
                hide(e[1]);
                var c = document.querySelector(`.displaydata`);
                c.classList.add('hide');
                var b = document.querySelector(`.${e[1]}`);
                b.classList.remove('hide');
                v.classList.add('re');
                setTimeout(() => {
                    v.classList.remove('re');
                }, 200);
            });
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


        //add medicine
        var addmed = document.querySelector('.am');
        addmed.addEventListener('click', () => {
            var b = document.querySelector(`.addmed`);
            b.classList.add('hide');
            var name = document.querySelector('#medname');
            var quantity = document.querySelector('#quantity');
            var content = {
                name: name.value,
                quantity: quantity.value
            };
            var options = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(content)
            };

            fetch('/addmedicine', options)
                .then(res => res.json())
                .then(data => {
                    alert(data.key);
                });
        });


        //search medicine
        var search = document.querySelector('.search');
        search.addEventListener('click', () => {
            var b = document.querySelector(`.searchmed`);
            b.classList.add('hide');
            var name = document.querySelector('#name');
            var content = {
                name: name.value
            };
            var options = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(content)
            };

            fetch('/searchmedicine', options)
                .then(res => res.json())
                .then(data => {
                    if (data.key != 'not available')
                        displaydata(data, 'searched Medicine');
                    else
                        alert('not available medicine');
                });
        });



        //medicines available 
        var listmed = document.querySelector('.a2');
        listmed.addEventListener('click', () => {
            listmed.classList.add('re');
            setTimeout(() => {
                listmed.classList.remove('re');
            }, 200);

            fetch('/medicines')
                .then(res => res.json())
                .then(data => {
                    if (data.key != 'pharmacy error')
                        displaydata(data, 'List of Medicines');
                    else
                        alert('error');
                });
        });




        //adding medicine for billing
        var adm = document.querySelector('.addd');
        adm.addEventListener('click', () => {
            var name = document.querySelector('#mname');
            var quantity = document.querySelector('#items');
            var content = {
                name: name.value,
                quantity: quantity.value
            };
            var options = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(content)
            };

            fetch('/addmedbill', options)
                .then(res => res.json())
                .then(data => {
                    alert(data.key)
                    if (data.key === 'done') {
                        var q = {
                            1: name.value,
                            2: quantity.value,
                            3: data.price
                        }
                        bills(q);
                    }
                    else
                        alert(data.key);
                });
        });


        //print bill
        var bil = document.querySelector('.billing');
        var print = document.querySelector('.print');
        print.addEventListener('click', () => {
            var t1=document.querySelector('.b3');
            var t2=document.querySelector('.b2');
            var t3=document.querySelector('.b5');
            var t4=document.querySelector('.b6');
            t1.innerHTML=`${t1.innerHTML}: ${t1.parentNode.parentNode.firstElementChild.nextElementSibling.firstChild.value}`;
            t2.innerHTML=`${t2.innerHTML}: ${t2.parentNode.parentNode.firstElementChild.nextElementSibling.firstChild.value}`;
            t3.innerHTML=`${t3.innerHTML}: ${t3.parentNode.parentNode.firstElementChild.nextElementSibling.firstChild.value}`;
            t4.innerHTML=`${t4.innerHTML}: ${t4.parentNode.parentNode.firstElementChild.nextElementSibling.firstChild.value}`;
            newwin = window.open('', 'Print-Window');
            newwin.document.write('<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><style>.billprinting{width: 100%;height: 500px;position: relative;}.address,.contact{position: absolute;bottom: 10px;left: 40%;}.address{bottom: 30px;}.table2{width: 100%;}.addd,.print,#items,#mname,.l1,.l2{display:none;}input{border-color:white;border-left:0px solid white;border-top:0px solid white;}.b1{width: 100%;text-align: center;font-size: 60px;}.l,.r{margin-left: 5%;width: fit-content;}.r{margin-left: 60%;position: absolute;margin-top: -60px;}.contact,.address{width: 100%;text-align: center;}</style>');
            newwin.document.write(bil.outerHTML);
            newwin.document.write('</body></html>')
            newwin.print();
            t1.innerHTML=`patient_name`;
            t2.innerHTML=`patient_id`;
            t3.innerHTML='doctor_name';
            t4.innerHTML='pharmacist_name';
        });

    }
    else
    alert('login first');

});