import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
	const [showTaskForm, setShowTaskForm] = useState(false)
	const [tasks, setTasks] = useState([])

	// fetch tasks from server
	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5000/tasks')
		const data = await res.json()
		return data
	}

	useEffect(() => {
		const getTasks = async () => {
			const data = await fetchTasks()
			setTasks(data)
		}

		getTasks()
	}, [])

	// Add Task
	const addTask = async (task) => {
		const res = await fetch('http://localhost:5000/tasks', {
			method: 'POST',
			body: JSON.stringify(task),
			headers: { 'Content-Type': 'application/json' },
		})

		const newTask = await res.json()

		setTasks([...tasks, newTask])

		// const id = Math.floor(Math.random() * 1000) + 1

		// const newTask = { id, ...task }
		// setTasks([...tasks, newTask])
	}

	// deleting tasks
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'DELETE',
		})

		setTasks(
			tasks.filter((task) => {
				return task.id !== id
			})
		)
	}

	// fetch a task
	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`)
		const data = await res.json()

		return data
	}

	// toggle reminder of a task
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id)
		const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'PUT',
			body: JSON.stringify(updatedTask),
			headers: { 'Content-Type': 'application/json' },
		})

		const data = await res.json()

		setTasks(
			tasks.map((task) => {
				return task.id === id ? { ...task, reminder: data.reminder } : task
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
				<h4 className='task'>No Tasks remaining</h4>
			)}
		</div>
	)
}

export default App
