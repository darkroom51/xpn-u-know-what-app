import React, {Component} from 'react';
import {Glyphicon, Checkbox} from 'react-bootstrap'


class TodoTask extends Component {
    render() {
        return (
            <tr key={this.props.el.id}>
                <td>
                    {this.props.el.name}
                </td>
                <td>
                    {
                        this.props.el.priority === "0" ? "Low" : this.props.el.priority === "1" ? "Medium" : "High"
                    }
                </td>
                <td>
                    <Checkbox
                        checked={this.props.el.status}
                        onChange={() => {
                            this.props.toggleTodoStatus(this.props.el.id)
                        }}
                    >
                    </Checkbox>
                </td>
                <td>
                    <Glyphicon
                        glyph="trash"
                        style={{cursor: 'pointer'}}
                        onClick={() => {
                            this.props.deleteTodo(this.props.el.id)
                        }}
                    />
                </td>
            </tr>
        );
    }
}

export default TodoTask;
