import React, {useMemo, useRef, useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'b', body: 'c'},
		{id: 2, title: 'a', body: 'b'},
		{id: 3, title: 'c', body: 'a'},
	]);
	const [filter, setFilter] = useState({sort: '', query: ''});

	const sortedPosts = useMemo(() => {
		if (filter.sort) {
			return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
		}
		return posts;
	}, [filter.sort, posts]);

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query));
	}, [filter.query, sortedPosts]);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
	}

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	}

	return (
		<div className="App">
			<PostForm create={createPost}/>
			<hr style={{margin: '15px 0'}}/>
			<PostFilter filter={filter} setFilter={setFilter}/>
			<PostList remove={removePost} posts={sortedAndSearchedPosts}
								 title='Список постов 1'/>
		</div>
	);
}

export default App;
