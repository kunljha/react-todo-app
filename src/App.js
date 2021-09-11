import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'

function App() {
	const [tasks, setTasks] = useState([
		{
			id: 1,
			text: 'task-1',
			day: 'Sept 11, 2021',
			reminder: 'true',
		},
		{
			id: 2,
			text: 'task-2',
			day: 'Sept 12, 2021',
			reminder: 'false',
		},
		{
			id: 3,
			text: 'task-3',
			day: 'Sept 10, 2021',
			reminder: 'false',
		},
	])

	// deleting tasks
	const deleteTask = (id) => {
		setTasks(
			tasks.filter((task) => {
				return task.id !== id
			})
		)
	}

	return (
		<div className='container'>
			<Header title='Todo List' />
			{tasks.length > 0 ? (
				<Tasks tasks={tasks} deleteTask={deleteTask} />
			) : (
				<h4>To Tasks remaining</h4>
			)}
		</div>
	)
}

export default App
