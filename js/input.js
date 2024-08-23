//template
// const template = document.createElement('template');
// template.innerHTML = `
//     <style>
//         .input {
//             border: 1px solid black;
//             padding: 10px;
//         }
//     </style>
//     <slot></slot>
//     <slot name="Label"></slot>
//     <input type="text" class="input" />
// `;

class Input extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.input;
        this._template;
        this.shadowRoot.innerHTML = `
            <style>               
            </style>
            <slot></slot>
            <slot name="Label"></slot>
            <input type="text" class="form-control" />
        `;
        // Crie um observer para monitorar mudanças no atributo "class"
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    this.onClassChange(mutation.target.className);
                }
            }
        });
        // Observe o elemento atual (this) para mudanças no atributo "class"
        observer.observe(this, { attributes: true });
        // Adiciona o observer à instância do componente para que ele possa ser limpo mais tarde, se necessário
        this.observer = observer;
    }

    onClassChange(newClass) {
        console.log(`A classe foi alterada para: ${newClass}`);
        // Adicione a lógica desejada aqui
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }

    _isInputRequired() {
        if (this.hasAttribute('is-required')) {
            this.input.setAttribute('required', '');
        }
    }
    connectedCallback() {
        this.input = this.shadowRoot.querySelector('input');
        this._isInputRequired.bind(this)();
        this.input.addEventListener('focusout', this._focusOut.bind(this));
    }
    disconnectedCallback() {
        this.input.removeEventListener('focusout', this._focusOut.bind(this));
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (newValue === null) {
            console.log('attribute changed', attrName, oldValue, newValue);
            this.input.classList.remove('has-error');
            this.input.removeAttribute('required');
        }
    }
    static get observedAttributes() {
        return ['is-required'];
    }
    _focusOut() {
        if (this.hasAttribute('is-required')) {
            if (this.input.value !== '') {
                this.input.classList.remove('has-error');
            } else {
                this.input.classList.add('has-error');
            }
        }
    }
}

customElements.define('input-component', Input);


