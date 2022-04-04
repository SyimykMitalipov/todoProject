import React, { Component } from "react";
import './todo-add.css'

export default class TodoAdd extends Component {
    state = {
        label: ''
    }

    onLabelChange = (e) =>  {
        this.setState({
            label: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        this.props.addItem(this.state.label)
        this.setState({
            label: ''
        })
    }




    render() {
        // const { addItem } = this.props
        return (
            <form className='todo-add-form d-flex'

            onSubmit={this.onSubmit}>
                <input type="text" className='form-control'
                onChange={this.onLabelChange}
                placeholder='What needs to be done?'
                value={this.state.label}/>
                <button className='btn btn-outline-secondary'
                >Add To Do</button>
            </form>
        )
    }
}
