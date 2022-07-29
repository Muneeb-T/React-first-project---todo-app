import { useState } from 'react';
import './style.css';
import moment from 'moment';

function App() {
	const today = new Date();
	const [todo, setToDo] = useState('');
	const [todos, setToDos] = useState([]);
	return (
		<main className="to-do-wrapper">
			<header className="to-do-header">
				<div className="to-do-header-title">
					<div>
						<button
							className="to-do-header-delete"
							onClick={() => {
								setToDos([]);
							}}
						>
							🗑
						</button>
					</div>
					<h2 className="to-do-header-date">{moment(today).format('ddd, DD MMM YYYY')}</h2>
				</div>
				<div className="to-do-header-input">
					<input
						type="text"
						className="to-do-input"
						placeholder="Enter todo here"
						defaultValue={todo}
						autoComplete="false"
						onChange={(e) => setToDo(e.target.value)}
					/>
					<button
						className="to-do-input-submit"
						onClick={() => {
							setToDos([
								...todos,
								{ id: Date.now(), input: todo, status: false, date: new Date() },
							]);
						}}
					>
						👈
					</button>
				</div>
			</header>
			<section className="to-do-content">
				{todos.map((todo, index) => {
					const { id, input, status, date } = todo;
					let { timeDone } = todo;
					return (
						<div className="to-do-content-cards" key={index}>
							<button
								className="to-do-content-card-checkbox"
								onClick={() => {
									setToDos(
										todos.filter((currentTodo) => {
											if (currentTodo.id === id) {
												const { status } = currentTodo;
												currentTodo.status = !status;
												if (status) {
													currentTodo.timeDone = null;
												} else {
													currentTodo.timeDone = new Date();
												}
											}
											return currentTodo;
										})
									);
								}}
							>
								{status ? '✔' : null}
							</button>
							<div className="to-do-content-cards-info">
								<h3
									className="to-do-content-card-task"
									style={
										status
											? {
													textDecorationLine: 'line-through ',
													textDecorationStyle: 'solid',
													color: 'gray',
											  }
											: {}
									}
								>
									{input}
								</h3>
								<p className="time">
									Created : {moment(date).format('LT')}
									{ status ? `, Done : ${moment(timeDone).format('LT')}` : null}
								</p>
							</div>
							<div>
								<button
									className="to-do-content-card-edit-btn"
									onClick={() => {
										const deleted = todos.filter((currentTodo) => currentTodo.id !== todo.id);
										setToDos(deleted);
									}}
								>
									✏️
								</button>
								<button
									className="to-do-content-card-delete-btn"
									onClick={() => {
										const deleted = todos.filter((currentTodo) => currentTodo.id !== todo.id);
										setToDos(deleted);
									}}
								>
									❌
								</button>
							</div>
						</div>
					);
				})}
			</section>
		</main>
	);
}

export default App;
