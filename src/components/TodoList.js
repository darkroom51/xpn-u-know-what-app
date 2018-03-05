import React, {Component} from 'react';
import {Table} from 'react-bootstrap'
import TodoTask from './TodoTask'

class TodoList extends Component {
    render() {
        return (
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
                    this.props.state.todosList
                    &&
                    this.props.state.todosList
                        .map((el) => (
                            <TodoTask
                                key={el.id}
                                el={el}
                                toggleTodoStatus={this.props.toggleTodoStatus}
                                deleteTodo={this.props.deleteTodo}
                            />
                        ))
                }
                </tbody>
            </Table>
        );
    }
}

export default TodoList;
