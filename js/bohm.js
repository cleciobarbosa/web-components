class BohmInput extends HTMLElement {
    constructor() {
        super();
    
        // Cria a estrutura diretamente no Light DOM
        this.innerHTML = `
          <input type="text" class="form-control another-initial-class" />
        `;
    
        // Referência ao input interno
        this.inputElement = this.querySelector('input');
    
        // Armazena as classes iniciais do input
        this.initialClasses = [...this.inputElement.classList];
    
        // Crie um observer para monitorar mudanças no atributo "class" do host
        const observer = new MutationObserver((mutationsList) => {
          for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              this.onClassChange(mutation);
            }
          }
        });
    
        // Observe o elemento atual (this) para mudanças no atributo "class"
        observer.observe(this, { attributes: true, attributeOldValue: true });
    
        // Adiciona o observer à instância do componente para que ele possa ser limpo mais tarde, se necessário
        this.observer = observer;
      }
    
      // Método chamado quando a classe do host é alterada
      onClassChange(mutation) {
        const oldClassList = mutation.oldValue ? mutation.oldValue.split(/\s+/) : [];
        const newClassList = this.className.split(/\s+/);
    
        // Classes adicionadas
        const addedClasses = newClassList.filter(className => !oldClassList.includes(className));
    
        // Classes removidas
        const removedClasses = oldClassList.filter(className => !newClassList.includes(className));
    
        console.log('Added Classes:', addedClasses);
        console.log('Removed Classes:', removedClasses);
    
        // Adiciona as classes novas ao input interno
        addedClasses.forEach(className => {
          if (typeof className === 'string' && className.trim() !== '') {
            this.inputElement.classList.add(className);
          }
        });
    
        // Remove as classes que foram removidas do host, exceto as classes iniciais
        removedClasses.forEach(className => {
          if (typeof className === 'string' && className.trim() !== '' && !this.initialClasses.includes(className)) {
            this.inputElement.classList.remove(className);
          }
        });
      }
    
      // Desconectar o observer quando o elemento é removido do DOM, se necessário
      disconnectedCallback() {
        this.observer.disconnect();
      }
}

// Definindo o novo elemento customizado
customElements.define('bohm-input', BohmInput);