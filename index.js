let React    = require('react');
let ReactDOM = require('react-dom');
let Relay    = require('react-relay');
let TopItems = require('./components/TopItems');

class HackerNewsRoute extends Relay.Route {
  static routeName = 'HackerNewsRoute';
  static queries = {
    store: ((Component) => {
      // Component is our Item
      return Relay.QL`
      query root {
        hn { ${Component.getFragment('store')} },
      }
    `}),
  };
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://www.GraphQLHub.com/graphql')
);

let mountNode = document.getElementById('container');
let rootComponent = <Relay.RootContainer Component={TopItems} route={new HackerNewsRoute()} />;
ReactDOM.render(rootComponent, mountNode);
