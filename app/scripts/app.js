var ReactFireMixin = require("reactfire");
var Firebase = require("firebase");
var Router = require('react-router');
var routes = require('./config/routes');
var React = window.React = require('react'),
    mountNode = document.getElementById("app");

// var TodoList = React.createClass({
//   render: function() {
//     var createItem = function(itemText) {
//       return <li>{itemText}</li>;
//     };
//     return <ul>{this.props.items.map(createItem)}</ul>;
//   }
// });
// var TodoApp = React.createClass({
//   mixins: [ReactFireMixin],
//   getInitialState: function() {
//     return {items: [], text: ''};
//   },
  // onChange: function(e) {
  //   this.setState({text: e.target.value});
  // },
//   componentWillMount: function() {
//     this.firebaseRef = new Firebase("https://glowing-heat-6519.firebaseio.com/test/");
//     this.bindAsArray(new Firebase("https://glowing-heat-6519.firebaseio.com/test/"), "items");
//   },
//   handleSubmit: function(e) {
//     e.preventDefault();
//     this.firebaseRef.push({
//       text: this.state.text
//     });
//     var nextItems = this.state.items.concat([this.state.text]);
//     var nextText = '';
//     this.setState({items: nextItems, text: nextText});
//   },
//   render: function() {
//     return (
//       <div>
//         <h3>TODO</h3>
//         <TodoList items={this.state.items} />
//         <form onSubmit={this.handleSubmit}>
//           <input onChange={this.onChange} value={this.state.text} />
//           <button>{'Add #' + (this.state.items.length + 1)}</button>
//         </form>
//       </div>
//     );
//   }
// });


Router.run(routes, function (Handler) {
  React.render(<Handler/>, mountNode);
});



// React.render(<TodoApp />, mountNode);

