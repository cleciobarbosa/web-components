class MenuItem extends HTMLElement {
    constructor() {
        super();

        this.url="";
    }

    connectedCallback() {
        this.url = this.getAttribute("url");
        this.innerHTML = `
        <li class="nav-item">
            <a href="${this.url}" class="nav-link active" aria-current="page">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"/></svg>
           ${this.innerText}
            </a>
        </li>`;
    }
}

customElements.define("menu-item", MenuItem);