import Task from './Task'
const Tasks = ({ tasks, deleteTask }) => {
	return (
		<>
			{tasks.map((task) => {
				return <Task key={task.id} deleteTask={deleteTask} task={task} />
			})}
		</>
	)
}

export default Tasks
