const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan')
const port = process.env.PORT || 3000;

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

const clientBundle = './public/services';
const serverBundle = './templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundle, serverBundle, serviceConfig)

const React = require('react');
const ReactDOM = require('react-dom/server');
const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');

//Helper function to get the components
const getComponents = (components, props) => {
  return Object.keys(components).map((key) => {
    let component = React.createElement(component[key], props);
    return ReactDOM.renderToString(component);
  })
}
//Render the components

app.get('api/restaurant/:id', function(req, res) {
  let components = getComponents(services, { id: req.params.id });
  res.end(Layout(
    'Sidebar',
    App(...components),
    Scripts(Object.keys(services))
  ));
});

app.listen(port, () => {
  console.log('Listening to port: ', port)
})
