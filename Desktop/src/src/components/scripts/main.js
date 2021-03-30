preLoader.start();

let IP = localStorage.getItem("IP");
let IPwasStored;

if (IP) {
    IPwasStored = true;
    main();
} else {
    IPwasStored = false;
    inputIP();
}

function isValid(IP) {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(IP);
}

function inputIP() {
    swal({
        title: "Enter the IP Address of Device:",
        icon: false,
        content: {
            element: "input",
            attributes: {
                placeholder: "Type Here...",
            },
        },
        closeOnClickOutside: false,
    }).then((value) => {
        if (value) {
            if (isValid(value)) {
                IP = value;
                main();
            } else {
                swal({
                    title: "Not a valid IP Address.",
                    icon: "warning",
                    closeOnClickOutside: false,
                }).then(inputIP);
            }
        } else {
            swal({
                title: "IP Address is required!",
                icon: "warning",
                closeOnClickOutside: false,
            }).then(inputIP);
        }
    });
}

function main() {
    const socket = new WebSocket(`ws://${IP}:6969`);

    const headerIP = document.getElementById("IP"),
        menuIP = document.getElementById("menu-IP"),
        output = document.getElementById("output"),
        inputArea = document.getElementById("input-area"),
        input = document.getElementById("input");

    socket.onopen = () => {
        preLoader.stop();
        localStorage.setItem("IP", IP);
        headerIP.innerHTML = " @ " + IP;
        menuIP.innerHTML += IP;
        document.title += " @ " + IP;
        clearButton.style.display = autoScrollButton.style.display = "block";
        socket.onmessage = (messageEvent) => {
            let outputData;
            if (messageEvent.data.startsWith("\t")) {
                outputData = document.createElement("div");
            } else {
                outputData = document.createElement("span");
            }
            outputData.innerText = messageEvent.data.trim();
            output.appendChild(outputData);
        };

        inputArea.onsubmit = (submitEvent) => {
            submitEvent.preventDefault();
            let data = input.value;
            if (data) {
                socket.send(data);
                output.innerHTML += `<div class="sent">${data}</div>`;
                input.value = "";
            }
        };
    };

    socket.onerror = () => {
        if (IPwasStored) {
            localStorage.clear();
            location.reload();
        } else {
            swal({
                title: "Error in HandShaking; Try a different IP.",
                icon: "error",
                closeOnClickOutside: false,
            }).then((result) => {
                inputIP();
            });
        }
    };
}
