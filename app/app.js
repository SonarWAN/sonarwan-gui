// ES6 Component
// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

const ipc = require('electron').ipcRenderer;

// Search component created as a class
class Search extends React.Component {

  constructor() {
    super();
    this.state = { path: null };
  }

  handleOpen() {
    ipc.once('selected-directory', (event, path) => {
      this.setState({ path });
    });

    ipc.send('open-file-dialog');
  }

  render() {
    return (
      <form>
        <div>Hello World!</div>
        <button type="button" onClick={this.handleOpen.bind(this)}>Open file</button>
        {this.state.path && 'You selected: ' + this.state.path}
      </form>
    );
  }
}

// Render to ID content in the DOM
ReactDOM.render(<Search />,
  document.getElementById('content')
);
