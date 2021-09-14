import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, onAddForm, addButton }) => {
	const location = useLocation()

	return (
		<header className='header'>
			<h1>{title}</h1>
			{location.pathname === '/' ? (
				<Button
					color={addButton ? 'red' : 'green'}
					text={addButton ? 'Close' : 'Add'}
					onClick={onAddForm}
				/>
			) : (
				''
			)}
		</header>
	)
}

Header.defaultProps = {
	title: 'Todo List',
}

Header.propTypes = {
	title: PropTypes.string,
}

// css in jsx
// const headerStyle = {
// 	color: 'red',
// 	backgroundColor: 'black',
// }

export default Header
