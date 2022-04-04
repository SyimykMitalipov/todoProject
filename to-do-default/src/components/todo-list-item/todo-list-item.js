import React, { Component } from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {
        // state = {
        //     done: false,
        //     important: false
        // };

    // onLabelCLick = () => {
    //     this.setState(({done}) => {
    //         return {
    //             done: !done
    //         }
    //     });
    // }
    // onMarkImportant = () => {
    //     this.setState(({important}) => {
    //         return {
    //             important: !important
    //         }
    //     })
    // }

    render() {
        const { label , onDeleted,onToggleImportant,onToggleDone,
        important,done} = this.props
        // const { done = true, important = true } = this.state;
        const styles = {
            fontWeight: important ? 'bold': 'normal',
            color: important ? 'blue': 'black',
            textDecoration: done ? 'line-through': 'none'

        }

        return (
            <span className= "todo-list-item">
      <span
          className="todo-list-item-label"
          style={styles}
      onClick={ onToggleDone }>
        {label}
      </span>

      <button type="button"
              className="btn btn-outline-success btn-sm float-right"
              onClick={ onToggleImportant }>
        <i className="fa fa-exclamation"
         />
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"

            onClick={onDeleted}>
        <i className="fa fa-trash-o" />
      </button>
    </span>
        );
    }
}




