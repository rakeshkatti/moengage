var React = require('react');
var ReactFireMixin = require("reactfire");
var Search = require('react-search');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var mui = require('material-ui');

var ListItems = React.createClass({
	mixins: [ReactFireMixin],
	getInitialState: function() {
		return {items: []};
	},
	componentWillMount: function() {
		this.firebaseRef = new Firebase("https://glowing-heat-6519.firebaseio.com/items/");
		this.bindAsArray(new Firebase("https://glowing-heat-6519.firebaseio.com/items/"), "items");
		this.searchNames = [];
		this.state.items.map(function(item){
			this.searchNames.push(item.fullname);
		});
	},
	componentDidUpdate: function(nextProps){
		document.getElementById("loading_indicator").classList.add("hide");
	},
	sortBy: function(name){
		var items = this.state.items.sort(function (a, b) {
		  if (a[name] > b[name]) {
		    return 1;
		  }
		  if (a[name] < b[name]) {
		    return -1;
		  }
		  return 0;
		});
		this.setState({"items":items});
	},
	render: function() {
		var FloatingActionButton = mui.FloatingActionButton;
		var Toolbar = mui.Toolbar;
		var listItem = function(item){
			return <ListItem data={item} />
		}
		return (
    	<div>
			<Toolbar>
			  <div className = "row hidden-xs hidden-sm">
			  	<div className = "col-md-2 mui-font-style-button list-header">Full Name</div>
			  	<div className = "col-md-2 mui-font-style-button list-header">Gender</div>
			  	<div className = "col-md-3 mui-font-style-button list-header">Email</div>
			  	<div className = "col-md-2 mui-font-style-button list-header">Mobile Number</div>
			  	<div className = "col-md-3 mui-font-style-button list-header">Designation</div>
			  </div>
			  <div className = "row hidden-md hidden-lg">
			  	<div className = "col-xs-6 mui-font-style-button list-header">Label</div>
			  	<div className = "col-xs-6 mui-font-style-button list-header">Description</div>
			  </div>
			  
			</Toolbar>
			<div id = "loading_indicator">
				<div className='uil-cube-css'>
				  <div></div>
				  <div></div>
				  <div></div>
				  <div></div>
				</div>
			</div>
    		{this.state.items.reverse().map(listItem)}
    		<div className="addButton">
    			<Link to="addItem">
    				<FloatingActionButton iconClassName="glyphicon glyphicon-plus" secondary={true}/>
    			</Link>
    		</div>
    	</div>
    	);
	}
});

var ListItem = React.createClass({
	render: function(){
	var Paper = mui.Paper;
	return (
		<Paper zDepth={1} rounded={true}>
			<div className = "row list-item">
				<div className = "col-xs-6 header-phone hidden-md hidden-lg">Full Name</div>
				<div className = "col-xs-6 col-md-2">{this.props.data.fullname}</div>
				<div className = "col-xs-6 header-phone hidden-md hidden-lg">Gender</div>
				<div className = "col-xs-6 col-md-2">{this.props.data.gender}</div>
				<div className = "col-xs-6 header-phone hidden-md hidden-lg">Email</div>
				<div className = "col-xs-6 col-md-3">{this.props.data.email}</div>
				<div className = "col-xs-6 header-phone hidden-md hidden-lg">Mobile Number</div>
				<div className = "col-xs-6 col-md-2">{this.props.data.phone}</div>
				<div className = "col-xs-6 header-phone hidden-md hidden-lg">Designation</div>
				<div className = "col-xs-6 col-md-3">{this.props.data.designation}</div>
			</div>
		</Paper>
		);
	}
});

module.exports = ListItems;