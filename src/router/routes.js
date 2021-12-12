import Posts from "../pages/Posts";
import About from "../pages/About";
import PostPage from '../pages/PostPage'

export const routes = [
	{path: '/about', component: About, exact: true},
	{path: '/posts', component: Posts, exact: true},
	{path: '/posts/:id', component: PostPage, exact: true},
]
