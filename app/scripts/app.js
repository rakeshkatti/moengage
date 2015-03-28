var ReactFireMixin = require("reactfire");
var Firebase = require("firebase");
var Router = require('react-router');
var routes = require('./config/routes');
var React = window.React = require('react'),
    mountNode = document.getElementById("app");

Router.run(routes, function (Handler) {
  React.render(<Handler/>, mountNode);
});

