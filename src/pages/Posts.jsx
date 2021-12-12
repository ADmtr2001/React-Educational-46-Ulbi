import React, {useEffect, useState} from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {
	const [posts, setPosts] = useState([
		// {id: 1, title: 'b', body: 'c'},
		// {id: 2, title: 'a', body: 'b'},
		// {id: 3, title: 'c', body: 'a'},
	]);
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const response = await PostService.getAll(limit, page);
		setPosts(response.data);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
	});

	useEffect(() => {
		fetchPosts();
	}, [page]);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	}

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	}

	const changePage = (page) => {
		setPage(page);
	}

	return (
		<div className="Posts">
			<div style={{margin: '30px 0', textAlign: 'center'}}>
				<MyButton onClick={() => setModal(true)}>
					Создать пользователя
				</MyButton>
			</div>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost}/>
			</MyModal>
			<hr style={{margin: '15px 0'}}/>
			<PostFilter filter={filter} setFilter={setFilter}/>
			{postError && <h1>Произошла ошибка!</h1>}
			{isPostsLoading
				? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
					<Loader/></div>
				: <PostList remove={removePost} posts={sortedAndSearchedPosts}
										title='Список постов 1'/>}
			<Pagination page={page} changePage={changePage} totalPages={totalPages}/>
		</div>
	);
}

export default Posts;
