class MenuItem extends HTMLElement {
    constructor() {
        super();

        this.url = "";
        this.label = "";
        this.active = false;
        this.icon = "";

    }

    connectedCallback() {
        this.url = this.getAttribute("url");
        this.active = this.hasAttribute("active");
        this.icon = this.getAttribute("icon");
        this.innerHTML = `
        <li class="nav-item">
            <a href="${this.url}" class="nav-link ${this.active ? "active" : ""}" aria-current="page">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="${this.icon}"/></svg>
           ${this.innerText}
            </a>
        </li>`;
    }
}

customElements.define("menu-item", MenuItem);