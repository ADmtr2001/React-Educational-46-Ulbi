import React, {useState} from "react";

function App() {
	const [likes, setLikes] = useState(5);
	const [value, setValue] = useState('Text in input');

	function increment() {
		setLikes(likes + 1);
	}

	function decrement() {
		setLikes(likes - 1);
	}

	return (
		<div className="App">
			<h1>{likes}</h1>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
			<input
				type='text'
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
}

export default App;
