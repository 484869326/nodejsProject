let swiper = document.querySelector(".swiper");
let ulist = swiper.querySelector(".ulist");
let rlist = swiper.querySelector(".rlist");
let i = 0;
let hasActive = swiper.querySelector('.active');
let firstItem = ulist.children[ulist.childElementCount - 1];
let lastItem = ulist.children[0];
let duration = 500;
let prev = swiper.querySelector(".prev");
let next = swiper.querySelector(".next");
ulist.prepend(firstItem.cloneNode(true));
ulist.append(lastItem.cloneNode(true));

function autoplay() {
	hasActive && hasActive.classList.remove("active");
	ulist.style.transition = `all ${duration}ms ease-in`;
	let screenWidth = screen.width;
	if(screenWidth<=400){
		ulist.style.transform = `translateX(${-i*100}vw)`;
	}else{
		ulist.style.transform = `translateX(${-i*100}vw)`;
	}
	if (i == ulist.children.length - 2) {
		i = 0;
		setTimeout(() => {
			ulist.style.transition = 'none';
			ulist.style.transform = `translateX(${0}vw)`;
		}, duration)
	} else if (i == -1) {
		i = ulist.children.length - 3;
		setTimeout(() => {
			ulist.style.transition = 'none';
			if(screenWidth<=400){
				ulist.style.transform = `translateX(${-i*100}vw)`;
			}else{
				ulist.style.transform = `translateX(${-i*100}vw)`;
			}
		}, duration)
	}
	rlist.children[i].classList.add("active");
	hasActive = rlist.children[i];
}
let swiperTimer = setInterval(nextSwiperClick, 3000)

function nextSwiperClick() {
	i++;
	autoplay();
}

function lastSwiperClick() {
	i--;
	autoplay();
}
for (let z = 0; z < rlist.children.length; z++) {
	rlist.children[z].index = z;
}
rlist.onmouseover = function(e) {
	if (e.target != this) {
		i = e.target.index;
		autoplay();
	}
}

function clearSwiperTime() {
	clearInterval(swiperTimer);
	prev.style.opacity = '1';
	next.style.opacity = '1';
	swiperTimer = null;
}

function setSwiperTime() {
	if (swiperTimer) return;
	prev.style.opacity = '0';
	next.style.opacity = '0';
	swiperTimer = setInterval(nextSwiperClick, 3000)
}

let startX = 0,
	lastX = 0,
	endX = 0,
	thisX = 0,
	transformX = 0,
	isendX = 0;
let screenWidth = screen.width;
swiper.addEventListener("touchstart", function(e) {
	removeEvenListener();
	screenWidth = screen.width;
	clearInterval(swiperTimer);
	swiperTimer = null;
	startX = e.changedTouches[0].clientX;
	let ts = getComputedStyle(ulist).transform
	transformX = ts == "none" ? 0 : parseInt(ts.split(",")[4]);
	ulist.style.transition = 'none';
});
swiper.addEventListener("touchmove", function(e) {
	lastX = e.changedTouches[0].clientX;
	endX = (startX - lastX - transformX) / screenWidth * 100;
	ulist.style.transform = `translateX(${-endX}vw)`;
});
swiper.addEventListener("touchend", function() {
	setTimeout(() => {
		addEvenListener();
	}, 10)
	if (endX == 0) {
		if (swiperTimer) return;
		swiperTimer = setInterval(nextSwiperClick, 3000);
		return;
	}
	isendX = (startX - lastX) / screenWidth * 100;
	if (isendX > 0 && Math.abs(isendX) > 8) {
		i++;
	}
	if (isendX < 0 && Math.abs(isendX) > 8) {
		i--;
	}
	if (i == ulist.children.length - 2) {
		i = 0;
	} else if (i == -1) {
		i = ulist.children.length - 3;
	}
	if(screenWidth<=400){
		ulist.style.transform = `translateX(${-i*100}vw)`;
	}else{
		ulist.style.transform = `translateX(${-i*100}vw)`;
	}
	hasActive && hasActive.classList.remove("active");
	rlist.children[i].classList.add("active");
	hasActive = rlist.children[i];
	lastX = 0;
	endX = 0;
	if (swiperTimer) return;
	swiperTimer = setInterval(nextSwiperClick, 3000);
});

function addEvenListener() {
	prev.style.display = 'block';
	next.style.display = 'block';
	prev.addEventListener("click", lastSwiperClick);
	next.addEventListener("click", nextSwiperClick);
	swiper.addEventListener("mouseenter", clearSwiperTime);
	swiper.addEventListener("mouseleave", setSwiperTime);
}
addEvenListener();

function removeEvenListener() {
	prev.style.display = 'none';
	next.style.display = 'none';
	prev.removeEventListener("click", lastSwiperClick);
	next.removeEventListener("click", nextSwiperClick);
	swiper.removeEventListener("mouseenter", clearSwiperTime);
	swiper.removeEventListener("mouseleave", setSwiperTime);
}
