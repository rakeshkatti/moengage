var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var mui = require('material-ui');

var AddItem = React.createClass({
	contextTypes: {
		router: React.PropTypes.func
	},
	getInitialState: function() {
	    return {
	    	fullname:"",
	    	gender:"male",
	    	email:"",
	    	phone:"",
	    	designation:"",
	    	email_error_text:"",
	    	fullname_error_text:"",
            designation_error_text:"",
	    	phone_error_text:""
		};
	 },
	componentWillMount: function() {
		this.firebaseRef = new Firebase("https://glowing-heat-6519.firebaseio.com/items/");
	},
	handleSubmit: function() {
		if(this.state.email_error_text != "" 
            || this.state.phone_error_text != ""
            || this.state.fullname_error_text!= ""
            || this.state.designation_error_text != ""){
			return;
		}

		this.firebaseRef.push({
			fullname: this.state.fullname,
			gender: this.state.gender,
			phone: this.state.phone,
			email: this.state.email,
			designation: this.state.designation
		});
		this.context.router.transitionTo('app');
	},
	handleReset: function() {
		this.setState({"fullname":""});
		this.setState({"gender":"male"});
		this.setState({"email":""});
		this.setState({"phone":""});
		this.setState({"designation":""});
		this.setState({"email_error_text":""});
		this.setState({"phone_error_text":""});
		this.setState({"fullname_error_text":""});
        this.setState({"designation_error_text":""});
	},
  	render: function() {
  	var {DropDownMenu, FloatingActionButton, RaisedButton, RadioButtonGroup, RadioButton, TextField, DatePicker} = mui;
    return (
    	<div>
    		<h4 className="text-center mui-font-style-title">
    			Please fill out the following fields
    		</h4>
    		<div className="row">
    			<div className="col-md-4 col-md-offset-4 text-center">
    				<TextField className="text-field" id={"fullname"} 
    					onChange={this.validate}
    					value={this.state.fullname}
    					errorText={this.state.fullname_error_text}
    					hintText="Please enter your fullname"
    					floatingLabelText="Full Name"  />
    			</div>
    		</div>

    		<div className="row">
    			<div className="col-md-4 col-md-offset-4">
    				<RadioButtonGroup 
    				  name="gender"
    				  onChange={this.validate}
    				  id={"gender"}
    				  defaultSelected={this.state.gender}>
    				    <RadioButton className="radio_buttons"
    				      value="male"
    				      onChange={this.validate}
    				      id={"gender"}
    				      defaultChecked={true}
    				      label="Male" />
    				    <RadioButton className="radio_buttons"
    				      value="female"
    				      onChange={this.validate}
    				      id={"gender"}
    				      label="Female"
    				      />
    				</RadioButtonGroup>
    			</div>
    		</div>
    		<div className="row">
    			<div className="col-md-4 col-md-offset-4 text-center">
    				<TextField className="text-field" id={"email"} 
    					onChange={this.validate}
    					value={this.state.email}
    					errorText={this.state.email_error_text}
    					hintText="Please enter you email id"
    					floatingLabelText="Email"  />
    			</div>
    		</div>

    		<div className="row">
    			<div className="col-md-4 col-md-offset-4 text-center">
    				<TextField className="text-field" id={"phone"} 
    					onChange={this.validate}
    					value={this.state.phone}
    					errorText={this.state.phone_error_text}
    					hintText="Please enter 10 digit mobile number"
    					floatingLabelText="Mobile number"  />
    			</div>
    		</div>

    		<div className="row">
    			<div className="col-md-4 col-md-offset-4 text-center">
    				<TextField className="text-field" id={"designation"} 
    					onChange={this.validate}
    					value={this.state.designation}
                        errorText={this.state.designation_error_text}
    					hintText="Please enter your designation"
    					floatingLabelText="Designation"  />
    			</div>
    		</div>
    		<br />

    		<div className="row">
    			<div className="col-xs-6 col-md-2 col-md-offset-4 text-right">
    				<RaisedButton onClick={this.handleSubmit} label="Add" primary={true} />
    			</div>
    			<div className="col-xs-6 col-md-2">
    				<RaisedButton onClick={this.handleReset} label="Reset" secondary={true} />
    			</div>
    		</div>

    		
    		<div className="addButton">
    			<Link to="app">
    				<FloatingActionButton iconClassName="glyphicon glyphicon-chevron-left" secondary={true}/>
    			</Link>
    		</div>
    		<br/>
    		<br/>
    	</div>
    	);
 	},
 	validate:function(e){
 		field = e.target.id;
 		value = e.target.value;
 		if(field == "email"){
 			this.setState({"email":value});
 			var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
 			 if(this.state.email == ""){
 			 	this.setState({"email_error_text":"Email cannot be empty"});
 			 } else if(!(re.test(value))){
 			 	this.setState({"email_error_text":"Please enter a valid email"});
 			 } else {
 			 	this.setState({"email_error_text":""});
 			 }
 		}
 		if(field == "phone"){
 			this.setState({"phone":value});
 			if(isNaN(value)){
 				this.setState({"phone_error_text":"Please enter only numbers"});
 			} else if(value.length != 10){
 				this.setState({"phone_error_text":"Mobile number must be 10 digits"});
 			} else {
 				this.setState({"phone_error_text":""});
 			}
 		}
 		if(field == "fullname"){
 			this.setState({"fullname":value});
            if(this.state.fullname.length > 50){
                this.setState({"fullname_error_text":"Full name cannot be more than 50 characters"});
            } else if(this.state.fullname != ""){
 				this.setState({"fullname_error_text":""});
 			}
 		}
 		if(field == "gender"){
 			this.setState({"gender":value});
 		}
 		if(field == "designation"){
            this.setState({"designation":value});
            if(this.state.fullname.length > 100){
                this.setState({"designation_error_text":"Designation cannot be more than 100 characters"});
            } else {
                this.setState({"designation_error_text":""});
            }
 		}
 	}
});

module.exports = AddItem;