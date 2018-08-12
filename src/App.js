import React, { Component } from 'react';
import marked from 'marked';
import './App.css';

// Interpret return button presses as line breaks
marked.setOptions({
  breaks: true,
});

// Option to open links in new tabs
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

class App extends Component {
  text = `# Header

## Sub header

[Stubborn Code](https://stubborncode.com)

\`console.log(42);\`

\`\`\`javascript
const message = 'This a JavaScript code block';
console.log(message);
\`\`\`

  * Unordered List Item
 
1. Ordered List Item

> This is a block quote.

![Sample Image](http://via.placeholder.com/150x50)

**Bold Text**
`
  state = {
    text: this.text,
  }

  convertText = (e) => {
    this.setState({ text: e.target.value },
      () => document.getElementById('preview').innerHTML = marked(this.state.text, { renderer: renderer})
    );
  }
  componentDidMount = () => {
    this.setState({ text: document.getElementById('editor').value },
      () => document.getElementById('preview').innerHTML = marked(this.state.text, { renderer: renderer})
    );
  }
  render() {
    return (
      <div>
        <h1 id="title">Minimal Markdown Previewer</h1>
        <div id="container">
          <textarea name="" rows="30" id="editor" value={this.state.text} onChange={this.convertText}>
          </textarea>
          <div id="preview"></div>
        </div>
      </div>
    );
  }
}

export default App;
