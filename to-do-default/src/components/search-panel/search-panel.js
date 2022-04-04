import React, {Component} from 'react';


import './search-panel.css';

export default class SearchPanel extends Component {
    state= {
      term: ''
    }
    onSearchChange = (e) =>  {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchChange(term)
    }

  render() {
      const { onSearch } = this.props
    return (
    <input type="text"
           className="form-control search-input"
           placeholder="Введите текст"
           onChange={onSearch} value={this.state.term}
           onChange={this.onSearchChange}

    />
    )
  }
};


