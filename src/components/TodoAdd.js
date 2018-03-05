import React, {Component} from 'react';
import {Button, ControlLabel, FormControl} from 'react-bootstrap'


class TodoAdd extends Component {
    render() {
        return (
            <div>
                <ControlLabel>Task Name</ControlLabel>
                <FormControl
                    type="text"
                    placeholder="New task ..."
                    value={this.props.state.todoName}
                    onChange={this.props.handleTodoName}
                />
                <ControlLabel>Priority</ControlLabel>
                <FormControl
                    componentClass="select"
                    placeholder="select"
                    onChange={this.props.handleTodoPriority}
                >
                    <option value="0">Low</option>
                    <option value="1">Medium</option>
                    <option value="2">High</option>
                </FormControl>
                <Button bsStyle="primary" onClick={this.props.addTodo}>Add Task</Button>
            </div>
        );
    }
}

export default TodoAdd;
