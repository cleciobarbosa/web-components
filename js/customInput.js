class CustomInput extends HTMLElement {
    constructor() {
        super();

        const type = this.getAttribute("type") || "text";
        const placeholder = this.getAttribute("placeholder") || "";
        this.innerHTML = `
       
            <input type="${type}" class="form-control" placeholder="${placeholder}" />
            <p class="error-message">
            </p>
        `;

        this.value = this.getAttribute("value") || "";
        this.error = this.getAttribute("error") || "";
    }

    set error(val){
        const errorMessage = typeof val === "string" ? val.trim() : null;
        this.querySelector("input").classList.toggle("is-invalid", Boolean(errorMessage));
        this.querySelector(".error-message").textContent = errorMessage;
    }

    get value(){
        return this.querySelector("input").value;
    }

    set value(val){
        this.querySelector("input").value = val;
    }
}

customElements.define("custom-input", CustomInput);

