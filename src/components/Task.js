import Button from './Button'
const Task = ({ task, deleteTask }) => {
	return (
		<div className='task'>
			<h3>{task.text}</h3>
			<button onClick={() => deleteTask(task.id)}>x</button>
			<p>{task.day}</p>
		</div>
	)
}

export default Task
