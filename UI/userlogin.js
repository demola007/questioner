var logincontainer = document.querySelector('#logincontainer');
var registercontainer = document.querySelector('#registercontainer');
var registertab = document.querySelector('#register-tab');
var logintab = document.querySelector('#login-tab');
var loginlink = document.querySelector('.loginlink');
var registerlink = document.querySelector('.registerlink');

registertab.addEventListener('click', function(){
	registeractive();
})

logintab.addEventListener('click', function(){
	loginactive();
})

loginlink.addEventListener('click', function(){
	loginactive();
})

registerlink.addEventListener('click', function(){
	registeractive();
})

function registeractive(){
	logincontainer.style.display = "none";
	registercontainer.style.display = "block"
	registertab.classList.add('active');
	logintab.classList.remove('active');
}

function loginactive (){
	logincontainer.style.display = "block";
	registercontainer.style.display = "none";
	logintab.classList.add('active');
	registertab.classList.remove('active');
}