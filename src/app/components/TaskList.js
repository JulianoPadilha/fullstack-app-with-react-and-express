import React from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/mutations';

export const TaskList = ({ tasks, name, id, createNewTask }) => (
  <div>
    <h3>
      { name }
    </h3>
    <div>
      {
        tasks.map(task => (
          <div key={task.id}>{ task.name }</div>
        ))
      }
    </div>
    <button onClick={ () => createNewTask(id) }>Add new</button>
  </div>
)

const createNewTask = (dispatch, id) => {
  console.log('Creating new task...', id);
  dispatch(requestTaskCreation(id));
}

const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id;
  return {
    name: ownProps.name,
    id: groupID,
    tasks: state.tasks.filter(task => task.group === groupID)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask: (id) => createNewTask(dispatch, id)
  }
}

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);