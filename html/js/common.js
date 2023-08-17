let loginState = localStorage.getItem("users");
let headers = {};
let token = JSON.parse(localStorage.getItem('token'));
if (token) {
	Object.assign(headers, {
		Authorization: `${token}`
	})
}

// if (!loginState) {
// 	alert("你还没登录");
// 	location.href = "login.html";
// }
let xhr = new XMLHttpRequest();
xhr.open('get', 'http://localhost:8888/api/users/ifLogin', true);
xhr.setRequestHeader("Authorization", token);
xhr.send();
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 && xhr.status == 200) {
		if (xhr.responseText) {
			alert('登录失效,请重新登录');
			location.href = "login.html";
		}
	}
};

let exit = document.querySelector("#exit");
if (exit) {
	exit.onclick = function() {
		xhr.open('get', 'http://localhost:8888/api/users/exit');
		xhr.send();
		localStorage.removeItem("users");
		localStorage.removeItem("token");
		location.href = "login.html";
	}
}
