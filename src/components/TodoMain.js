import React, {Component} from 'react';
import {Grid, Row, Col, Button, Panel, Alert, ControlLabel, FormControl, Table, Glyphicon, Checkbox} from 'react-bootstrap'


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

        tempTodosList.push({
            name: this.state.todoName,
            priority: this.state.todoPriority,
            status: this.state.todoStatus,
            id: Date.now(),
        });

        localStorage.setItem('todos', JSON.stringify(tempTodosList));

        this.setState({
            todoName: '',
            todoPriority: "0",
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

                                <div>
                                    <ControlLabel>Task Name</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="New task ..."
                                        value={this.state.todoName}
                                        onChange={this.handleTodoName}
                                    />
                                    <ControlLabel>Priority</ControlLabel>
                                    <FormControl
                                        componentClass="select"
                                        placeholder="select"
                                        onChange={this.handleTodoPriority}
                                    >
                                        <option value="0">Low</option>
                                        <option value="1">Medium</option>
                                        <option value="2">High</option>
                                    </FormControl>
                                    <Button bsStyle="primary" onClick={this.addTodo}>Add Task</Button>
                                </div>

                                <Table hover>
                                    <thead>
                                    <tr style={{backgroundColor: '#444', color: 'white'}}>
                                        <th>Task Name</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Del</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.todosList
                                        &&
                                        this.state.todosList
                                            .map((el) => (
                                                <tr key={el.id}>
                                                    <td>
                                                        {el.name}
                                                    </td>
                                                    <td>
                                                        {
                                                            el.priority === "0" ? "Low" : el.priority === "1" ? "Medium" : "High"
                                                        }
                                                    </td>
                                                    <td>
                                                        <Checkbox
                                                            checked={el.status}
                                                            onChange={()=>{this.toggleTodoStatus(el.id)}}
                                                        >
                                                        </Checkbox>
                                                    </td>
                                                    <td>
                                                        <Glyphicon
                                                            glyph="trash"
                                                            style={{cursor:'pointer'}}
                                                            onClick={()=>{this.deleteTodo(el.id)}}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                    }
                                    </tbody>
                                </Table>

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
