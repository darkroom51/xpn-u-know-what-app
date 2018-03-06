import React, {Component} from 'react';
import {Grid, Row, Col, Panel, Alert, Glyphicon} from 'react-bootstrap'
import TodoAdd from './TodoAdd'
import TodoList from './TodoList'


class TodoMain extends Component {
    state = {
        todosList: [],

        todoId: null,
        todoName: '',
        todoPriority: "0",
        todoStatus: false,
        todoNameErr: ''
    }


    componentDidMount() {
        this.getTodos()
    }

    getTodos() {
        const data = JSON.parse(localStorage.getItem('todos'));
        if (data !== null) {
            this.setState({todosList: data})
        }
    }

    addTodo = () => {
        if (!this.state.todoName) {
            this.setState({todoNameErr: 'Task name can not be empty!'})
            return
        }
        let tempTodosList = [];
        tempTodosList = tempTodosList.concat(this.state.todosList);
        tempTodosList = tempTodosList.concat({
            name: this.state.todoName,
            priority: this.state.todoPriority,
            status: this.state.todoStatus,
            id: Date.now(),
        });
        localStorage.setItem('todos', JSON.stringify(tempTodosList));
        this.setState({
            todoName: '',
            id: '',
            todoNameErr: '',
            todosList: tempTodosList,
        });
    };

    deleteTodo = (id) => {
        let tempTodosList = this.state.todosList.filter(el => el.id !== id)
        localStorage.setItem('todos', JSON.stringify(tempTodosList));
        this.setState({todosList: tempTodosList});
    };

    toggleTodoStatus = (id) => {
        let tempTodosList = this.state.todosList.map(el =>{
            if (el.id === id) {
                el.status = !el.status
            }
            return el
        })
        localStorage.setItem('todos', JSON.stringify(tempTodosList));
        this.setState({todosList: tempTodosList});
    };

    sortTodo = (column, order) => {
        let todosTemp = []
        todosTemp = todosTemp.concat(this.state.todosList);
        switch (column) {
            case 'name': {
                if (order)
                    todosTemp.sort((a, b) => {return b.name.localeCompare(a.name)})
                else
                    todosTemp.sort((a, b) => {return a.name.localeCompare(b.name)})
                break;
            }
            case 'priority': {
                if (order)
                    todosTemp.sort((a, b) => {return +b.priority - +a.priority})
                else
                    todosTemp.sort((a, b) => {return +a.priority - +b.priority})
                break;
            }
            case 'status': {
                if (order)
                    todosTemp.sort((a, b) => {return b.status - a.status})
                else
                    todosTemp.sort((a, b) => {return a.status - b.status})
                break;
            }
            default: {
                todosTemp.sort((a, b) => {return a.id - b.id})
                break;
            }
        }
        this.setState({todosList: todosTemp});
    }

    handleTodoName = (e) => this.setState({todoName: e.target.value});
    handleTodoPriority = (e) => this.setState({todoPriority: e.target.value});


    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <Panel>
                            <Panel.Heading style={{textAlign: 'center', fontSize: 20}}>Todo List</Panel.Heading>
                            <Panel.Body>

                                {this.state.todoNameErr ? <Alert>{this.state.todoNameErr}</Alert> : null}

                                <TodoAdd
                                    state={this.state}
                                    handleTodoName={this.handleTodoName}
                                    handleTodoPriority={this.handleTodoPriority}
                                    addTodo={this.addTodo}
                                />

                                <TodoList
                                    todosList={this.state.todosList}
                                    toggleTodoStatus={this.toggleTodoStatus}
                                    deleteTodo={this.deleteTodo}
                                    sortTodo={this.sortTodo}
                                />

                            </Panel.Body>
                            <Panel.Footer style={{textAlign: 'center', fontSize: 10}}>
                                made with <Glyphicon glyph="heart-empty"/> by name
                            </Panel.Footer>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default TodoMain;
