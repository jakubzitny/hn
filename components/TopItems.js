let React    = require('react');
let Relay    = require('react-relay');
let Item 		 = require('./Item.js');

class TopItems extends React.Component {
	render() {
    let items = this.props.store.stories.map(
      (store, idx) => <Item store={store} key={idx} />
    );
    let variables = this.props.relay.variables;

    // To reduce the perceived lag
    // There are less crude ways of doing this, but this works for now
    let currentStoryType = (this.state && this.state.storyType) || variables.storyType;

    return <div>
      <select onChange={this._onChange.bind(this)} value={currentStoryType}>
        <option value="top">Top</option>
        <option value="new">New</option>
        <option value="ask">Ask HN</option>
        <option value="show">Show HN</option>
      </select>
      { items }
    </div>;
  }

	_onChange(ev) {
    let storyType = ev.target.value;
    this.setState({ storyType });
    this.props.relay.setVariables({
      storyType
    });
  }

}

TopItems = Relay.createContainer(TopItems, {
  initialVariables: {
    storyType: "top"
  },
  fragments: {
    store: () => Relay.QL`
      fragment on HackerNewsAPI {
        stories(storyType: $storyType) { ${Item.getFragment('store')} },
      }
    `,
  },
});

module.exports = TopItems;
