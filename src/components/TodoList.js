import React, {Component} from 'react';
import {Table, Glyphicon} from 'react-bootstrap'
import TodoTask from './TodoTask'


const SortIcon = (props) => (
    props.order
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
        order: false
    }


    handleSortByName = () => {
        this.props.sortTodo('name',this.state.order)
        this.setState({sortByName:true, sortByPriority:false, sortByStatus:false, order:!this.state.order})
    }

    handleSortByPriority = () => {
        this.props.sortTodo('priority',this.state.order)
        this.setState({sortByName:false, sortByPriority:true, sortByStatus:false, order:!this.state.order})
    }

    handleSortByStatus = () => {
        this.props.sortTodo('status',this.state.order)
        this.setState({sortByName:false, sortByPriority:false, sortByStatus:true, order:!this.state.order})
    }

    handleSortReset = () => {
        this.props.sortTodo('reset',this.state.order)
        this.setState({sortByName:false, sortByPriority:false, sortByStatus:false, order:false})
    }



    render() {
        return (
            <Table hover style={{marginTop:20}}>
                <thead>
                <tr style={{backgroundColor: '#444', color: '#ddd', cursor:'pointer'}}>
                    <th onClick={this.handleSortByName}>
                        Task Name &nbsp; {this.state.sortByName ? <SortIcon order={this.state.order} /> : <Glyphicon glyph={"sort"} />}
                    </th>
                    <th onClick={this.handleSortByPriority}>
                        Priority &nbsp; {this.state.sortByPriority ? <SortIcon order={this.state.order} /> : <Glyphicon glyph={"sort"} />}
                    </th>
                    <th onClick={this.handleSortByStatus}>
                        Status &nbsp; {this.state.sortByStatus ? <SortIcon order={this.state.order} /> : <Glyphicon glyph={"sort"} />}
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
