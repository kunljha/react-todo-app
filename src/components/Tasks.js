import Task from './Task'
const Tasks = ({ tasks, deleteTask, toggleReminder }) => {
	return (
		<>
			{tasks.map((task) => {
				return (
					<Task
						key={task.id}
						task={task}
						deleteTask={deleteTask}
						toggleReminder={toggleReminder}
					/>
				)
			})}
		</>
	)
}

export default Tasks
