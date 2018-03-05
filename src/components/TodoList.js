import React, {Component} from 'react';
import {Table, Glyphicon} from 'react-bootstrap'
import TodoTask from './TodoTask'


const SortIcon = (props) => (
    props.sortDesc
        ?
        <Glyphicon glyph={"sort-by-attributes"} />
        :
        <Glyphicon glyph={"sort-by-attributes-alt"} />
)

class TodoList extends Component {

    state = {
        sortByName: false,
        sortByPriority: false,
        sortByStatus: false,
        sortDesc: false
    }


    handleSortByName = () => {
        this.props.sortTodo('name',this.state.sortDesc)
        this.setState({sortByName:true, sortByPriority:false, sortByStatus:false, sortDesc:!this.state.sortDesc})
    }

    handleSortByPriority = () => {
        this.props.sortTodo('priority',this.state.sortDesc)
        this.setState({sortByName:false, sortByPriority:true, sortByStatus:false, sortDesc:!this.state.sortDesc})
    }

    handleSortByStatus = () => {
        this.props.sortTodo('status',this.state.sortDesc)
        this.setState({sortByName:false, sortByPriority:false, sortByStatus:true, sortDesc:!this.state.sortDesc})
    }

    handleSortReset = () => {
        this.props.sortTodo('reset',this.state.sortDesc)
        this.setState({sortByName:false, sortByPriority:false, sortByStatus:false, sortDesc:false})
    }



    render() {
        return (
            <Table hover>
                <thead>
                <tr style={{backgroundColor: '#444', color: 'white'}}>
                    <th onClick={this.handleSortByName}>
                        Task Name &nbsp; {this.state.sortByName ? <SortIcon sortDesc={this.state.sortDesc} /> : null}
                    </th>
                    <th onClick={this.handleSortByPriority}>
                        Priority &nbsp; {this.state.sortByPriority ? <SortIcon sortDesc={this.state.sortDesc} /> : null}
                    </th>
                    <th onClick={this.handleSortByStatus}>
                        Status &nbsp; {this.state.sortByStatus ? <SortIcon sortDesc={this.state.sortDesc} /> : null}
                    </th>
                    <th onClick={this.handleSortReset}>[reset]</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.todosList
                    &&
                    this.props.todosList
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
