module.exports = (items) => {
  `
    <scripts src="/lib/react.production.min.js"></script>
    <scripts src="/lib/react-dom.production.min.js"></script>

    ${items.map(item => {
      return `<script src="/services/${item}.js"></script>`;
    }).join('\n')}

    <script>
      ${items.map(item => `
        ReactDOM.hydrate(
          React.createElement(${item}),
          document.getElementById('${items}')
        );`).join('\n')}
    </script>
  `
}