class Sample extends HTMLElement {
    constructor() {
        super();

        //pega o valor passavo dentro do componente ex: <sample-component>texto</sample-component>
        this.innerHTML = `<h1>${this.innerText}</h1>`
    }
}

customElements.define('sample-component', Sample);