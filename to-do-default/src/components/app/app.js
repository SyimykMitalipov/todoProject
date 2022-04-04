 import React, {Component} from "react";


import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import TodoList from "../todo-list/todo-list";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import TodoAdd from "../todo-add/todo-add";
import Login from "../login";
import TodoApi from "../../services/todo-api";

// import './index.css';

export default class App extends Component {
    maxId = 100;
    state = {
        todoData: [],
        term: '', 
        filter: 'all' // active , All , Done
    };

    todoApi = new TodoApi()


    createToDo(label) {
        return {
            label: label,
            important: false,
            id: this.maxId++
        }; 
    }
    toggleProperty (arr , id, propName) {
        const indx = arr.findIndex((ele) => ele.id === id)
        const oldItem = arr[indx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        }

        return  [
            ...arr.slice(0, indx),
            newItem,
            ...arr.slice(indx + 1)
        ]

    }
    onSearchChange = (term) => {
        this.setState({ term });
    }
    onChangeFilter = (filter) => {
        this.setState({ filter });
    }


    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData,id,'important')
                
            }

        })
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return{
                todoData: this.toggleProperty(todoData,id,'done')

            }
        })
    }
       search = (items , term) => {
        if(term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label
            .toLowerCase()
            .indexOf(term.toLowerCase()) > -1;
        })
    }
    filter(items ,filter) {
        switch(filter) {
             case 'all':
                 return items;
             case 'active':
                 return items.filter((item) => !item.done);
             case 'done':
                 return items.filter((item) => item.done);
                 default:
                     items;

        }
    }
    onLoadTodos = () => {
        this.todoApi.getTodos().then(todos => {
            console.log("todos: ", todos);
        
            this.setState({
                todoData: todos
            })
        })
    }
    componentDidMount = () =>{
        this.onLoadTodos()
    }
    addItem = (labelText) => {
        this.todoApi.createTodos(labelText).then(data => {
        this.onLoadTodos()
            
        })
    };
    deleteItem = (id) => {
        this.todoApi.deleteTodos(id).then(data => {
        this.onLoadTodos() 
        })
    }
    render() {
        const credentials =  localStorage.getItem('credentials')
        
        
        if(credentials) {
        const {todoData , term , filter} = this.state
        const visibleItem = this.filter(this.search(todoData,term),filter)

        const doneCount = todoData.filter((ele) => ele.done).length;
        const todoCount = todoData.length - doneCount

        return (
        
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel 
                    onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter filter={filter}
                    onFilterChange={this.onChangeFilter} />
                </div>

                <TodoList todos={visibleItem}
                          onDeleted={this.deleteItem}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}/>
                <TodoAdd addItem={this.addItem}/>
            </div>
        );
        }else {
            return <Login />
        }
    }
}


