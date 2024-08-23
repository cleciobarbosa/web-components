class CheckBox extends HTMLElement {

    constructor() {
        super();
        this.input;
        this.innerHTML = `<div class="checkbox mb-1">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input"
                                        data-type-check disabled>
                                    <label class="custom-control-label">
                                    Check me out
                                    </label>
                                </div>
                            </div>`;
       
    }

    connectedCallback() {
        this.input = this.querySelector('input');
        this.addEventListener('click', e => this._click(e));
    }

    _click(e) {
        
        console.log('click', e);
        this.input.checked = !this.input.checked;
    }
    get checked() {
        return this.input.checked;
    }
    set checked(value) {
        this.input.checked = value;
    }
}

customElements.define("custom-checkbox", CheckBox);