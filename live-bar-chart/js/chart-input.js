const templateChartInput = document.createElement('template');
templateChartInput.innerHTML = `
    <form id="new-chart-form">
        <input id="x-input" type="text" placeholder="X values">
        <input id="y-input" type="text" placeholder="Y values">
        <input type="submit" value="+">
    </form>
`;

class ChartInput extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log('ChartInput ADDED TO THE DOM');
        this.appendChild(templateChartInput.content.cloneNode(true));
        this.$form = this.querySelector('form');
        this.$xinput = this.querySelector('#x-input');
        this.$yinput = this.querySelector('#y-input');
        this.$form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!this.$xinput.value || !this.$yinput.value) return;
            this.dispatchEvent(new CustomEvent('onSubmit', { detail: [this.$xinput.value, this.$yinput.value] }));
            this.$xinput.value = '';
            this.$yinput.value = '';
        });
    }
}

window.customElements.define('chart-input', ChartInput);
