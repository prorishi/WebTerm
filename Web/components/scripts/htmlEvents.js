const menuButton = document.getElementById("menu"),
    menuContent = document.getElementById("menu-content"),
    autoScrollButton = document.getElementById("auto-scroll"),
    clearButton = document.getElementById("clear"),
    fullScreenButton = document.getElementById("full-screen"),
    reLoadButton = document.getElementById("reload"),
    reSetButton = document.getElementById("reset");

let autoScroll, fullScreen = false;
function toggleAutoScroll() {
    autoScroll = !autoScroll;
    if (autoScroll) {
        output.addEventListener("DOMSubtreeModified", scrollDown);
        scrollDown();
    } else output.removeEventListener("DOMSubtreeModified", scrollDown);
}

function scrollDown() {
    output.scrollTop = output.scrollHeight;
}

function clearOutPut() {
    output.innerHTML = "";
}

function toggleFullScreen() {
    fullScreen = !fullScreen;
    fullScreen ? openFullscreen() : closeFullscreen();
}

function openFullscreen() {
    let screen = document.documentElement;
    if (screen.requestFullscreen) {
        screen.requestFullscreen();
    } else if (screen.webkitRequestFullscreen) {
        screen.webkitRequestFullscreen();
    } else if (screen.msRequestFullscreen) {
        screen.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function hardReSet() {
    localStorage.removeItem("IP");
    location.reload();
}


autoScrollButton.onclick = toggleAutoScroll;
clearButton.onclick = clearOutPut;
fullScreenButton.onclick = toggleFullScreen;
reLoadButton.onclick = () => {
    location.reload();
};
reSetButton.onclick = hardReSet;

menuButton.onmouseenter = menuButton.ontouchstart = () => {
    menuContent.style.display = "block";
    menuContent.style.animation = "fade-in .4s";
};

menuButton.onmouseleave = () => {
    menuContent.style.animation = "fade-out .4s";
    setTimeout(() => {
        menuContent.style.display = "none";
    }, 350);
};

document.onkeydown = (keyDownEvent) => {
    if (keyDownEvent.altKey && (keyDownEvent.key == "S" || keyDownEvent.key == "s")) {
        toggleAutoScroll();
    }
    if (keyDownEvent.altKey && (keyDownEvent.key == "C" || keyDownEvent.key == "c")) {
        clearOutPut();
    }
    if (keyDownEvent.altKey && (keyDownEvent.key == "R" || keyDownEvent.key == "r")) {
        hardReSet();
    }
};

