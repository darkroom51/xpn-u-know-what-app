import React, {Component} from 'react';
import {Table, Glyphicon, Checkbox} from 'react-bootstrap'


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
                                        onChange={() => {
                                            this.props.toggleTodoStatus(el.id)
                                        }}
                                    >
                                    </Checkbox>
                                </td>
                                <td>
                                    <Glyphicon
                                        glyph="trash"
                                        style={{cursor: 'pointer'}}
                                        onClick={() => {
                                            this.props.deleteTodo(el.id)
                                        }}
                                    />
                                </td>
                            </tr>
                        ))
                }
                </tbody>
            </Table>
        );
    }
}

export default TodoList;
