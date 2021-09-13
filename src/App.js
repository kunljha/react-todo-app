import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
	const [showTaskForm, setShowTaskForm] = useState(false)
	const [tasks, setTasks] = useState([
		{
			id: 1,
			text: 'task-1',
			date: 'Sept 11, 2021',
			reminder: false,
		},
		{
			id: 2,
			text: 'task-2',
			date: 'Sept 12, 2021',
			reminder: true,
		},
		{
			id: 3,
			text: 'task-3',
			date: 'Sept 10, 2021',
			reminder: false,
		},
	])

	// Add Task
	const addTask = (task) => {
		const id = Math.floor(Math.random() * 1000) + 1

		const newTask = { id, ...task }
		setTasks([...tasks, newTask])
	}

	// deleting tasks
	const deleteTask = (id) => {
		setTasks(
			tasks.filter((task) => {
				return task.id !== id
			})
		)
	}

	// toggle reminder of a task
	const toggleReminder = (id) => {
		setTasks(
			tasks.map((task) => {
				return task.id === id ? { ...task, reminder: !task.reminder } : task
			})
		)
	}

	return (
		<div className='container'>
			<Header
				title='Todo List'
				onAddForm={() => {
					setShowTaskForm(!showTaskForm)
				}}
				addButton={showTaskForm}
			/>
			{showTaskForm ? <AddTask addTask={addTask} /> : ''}
			{tasks.length > 0 ? (
				<Tasks
					tasks={tasks}
					deleteTask={deleteTask}
					toggleReminder={toggleReminder}
				/>
			) : (
				<h4>No Tasks remaining</h4>
			)}
		</div>
	)
}

export default App
