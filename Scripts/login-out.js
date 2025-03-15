function login(){
    const userName = document.getElementById('username').value;
    const password = document.getElementById('pass').value;
    if(userName === ''){
        alert('Please tell your name first');
    }
    else if(password === ''){
        alert('Please enter your password');
    }
    else if(password !== '123456'){
        alert('Enter Valid Password');
    }
    else{
        document.querySelectorAll('.hidden').forEach(e=> {
            e.classList.remove('hidden');
            e.classList.add('block');
        });
        document.getElementById('banner').classList.add('hidden');
        Swal.fire({
            title: "অভিনন্দন",
            text: "চলুন আজ নতুন কিছু শেখা যাক",  
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#7A67EE", 
            allowOutsideClick: false,
            allowEscapeKey: false
        });
    }
}

function logout(){
    document.querySelectorAll('.block').forEach(e=> {
        e.classList.remove('block');
        e.classList.add('hidden');
    })
    const banner = document.getElementById('banner');

    banner.classList.remove('hidden');

}