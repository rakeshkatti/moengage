var Router = require('react-router'); 
var React = require('react');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var mui = require('material-ui');
var AddItem = require('../components/AddItem');
var ListItems = require('../components/ListItems');

var App = React.createClass({
  render: function () {
  	var RaisedButton = mui.RaisedButton;
  	var FontIcon = mui.FontIcon;
    return (
      <div>
      	<div className="navbar navbar-fixed-top nav">
      		<div className="container">
      			<Link to="app"><div className="mui-font-style-display-1">Moengage</div></Link>
      		</div>
        </div>
        {/* this is the important part */}
        <div className="component-content">
	        <RouteHandler />
	  	</div>  
      </div>
    );
  }
});

module.exports = (
  <Route name="app" path="/" handler={App}>
    <Route name="addItem" handler={AddItem}/>
    <DefaultRoute handler={ListItems}/>
  </Route>
);