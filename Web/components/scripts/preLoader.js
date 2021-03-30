const preLoader = {
    start: () => {
        this.preLoadWindow = document.createElement("div");
        this.preLoadWindow.id = "pre-load-window";
        for (let i = 0; i < 4; i++) {
            let dot = document.createElement("div");
            dot.classList.add("pre-loader-dot");
            this.preLoadWindow.appendChild(dot);
        }
        document.body.prepend(this.preLoadWindow);
        this.preLoadWindow.style.display = "flex";
    },
    stop: () => {
        this.preLoadWindow.remove();
    },
};
