const templateChart = document.createElement('template');
templateChart.innerHTML = `
    <section>
        <chart-input></chart-input>
        <div id="chart-container"></div>
    </section>
`;

//chart colors
var colors = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];


class LiveBarChart extends HTMLElement {
  constructor() {
    super();
    this._list = [];
    this._title = '';
    this._prefix = '';
  }

  connectedCallback() {
    this.appendChild(templateChart.content.cloneNode(true));
    this.$input = this.querySelector('chart-input');
    this.$chartContainer = this.querySelector('#chart-container');
    this.$input.addEventListener('onSubmit', this.addItem.bind(this));
    this.checkForAttibutes();
    this._render();
  }

  checkForAttibutes() {
    if (!this.hasAttribute("title")) this.setAttribute("title", "Cool Colourful Barchart");
    if (!this.hasAttribute("prefix")) this.setAttribute("prefix", "%");
  }

  getAttributes() {
    this._title = this.getAttribute("title")
    this._prefix = this.getAttribute("prefix")
  }

  displayChart() {
    this.getAttributes();
    document.getElementById('chart-container').innerHTML = "<text>no values inserted yet :)</text>";

    // constants
    var TROW = 'tr';
    var TDATA = 'td';
    var chart = document.createElement('div');
    // create the chart canvas
    var barchart = document.createElement('table');
    // create the title row
    var titlerow = document.createElement(TROW);
    // create the title data
    var titledata = document.createElement(TDATA);
    // make the colspan to number of records
    titledata.setAttribute('colspan', this._list.length + 1);
    titledata.setAttribute('class', 'charttitle');
    titledata.innerText = this._title;
    titlerow.appendChild(titledata);
    barchart.appendChild(titlerow);
    chart.appendChild(barchart);

    // create the bar row
    var barrow = document.createElement(TROW);

    // sort the data
    this._list && this._list.sort((a, b) => a.y - b.y)

    // add data to the chart
    for (var i = 0; i < this._list.length; i++) {
      barrow.setAttribute('class', 'bars');
      // create the bar data
      var bardata = document.createElement(TDATA);
      var bar = document.createElement('div');
      bar.setAttribute('class', colors[i % colors.length]);
      bar.style.height = this._list[i]['y'] + this._prefix;
      bardata.innerText = this._list[i]['y'] + this._prefix;
      bardata.appendChild(bar);
      barrow.appendChild(bardata);
    }

    // create legends
    var legendrow = document.createElement(TROW);
    var legend = document.createElement(TDATA);
    legend.setAttribute('class', 'legend');
    legend.setAttribute('colspan', this._list.length);

    // add legend data
    for (var i = 0; i < this._list.length; i++) {
      var legbox = document.createElement('span');
      legbox.setAttribute('class', 'legbox');
      var barname = document.createElement('span');
      barname.setAttribute('class', colors[i % colors.length] + ' xaxisname');
      var bartext = document.createElement('span');
      bartext.innerText = this._list[i]['x'];
      legbox.appendChild(barname);
      legbox.appendChild(bartext);
      legend.appendChild(legbox);
    }
    barrow.appendChild(legend);
    barchart.appendChild(barrow);
    barchart.appendChild(legendrow);
    chart.appendChild(barchart);
    document.getElementById('chart-container').innerHTML = chart.outerHTML;
  }

  addItem(e) {
    this._list.push({ x: e.detail[0], y: e.detail[1] });
    this._render();
  }

  disconnectedCallback() { }

  _render() {
    if (!this.$chartContainer) return;
    this._list && this.displayChart()
  }
}

window.customElements.define('live-bar-chart', LiveBarChart);
