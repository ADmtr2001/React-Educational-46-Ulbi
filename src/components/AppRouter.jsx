import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {publicRoutes, privateRoutes} from "../router/routes";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
	const {isAuth, isLoading} = useContext(AuthContext);

	if (isLoading) {
		return <Loader/>
	}

	return (
		isAuth
			? (<Switch>
				{privateRoutes.map(route => {
					return <Route key={route.path} component={route.component} path={route.path}
												exact={route.exact}/>
				})}
				<Redirect to='/posts'/>
			</Switch>)
			:
			(<Switch>
				{publicRoutes.map(route => {
					return <Route key={route.path} component={route.component} path={route.path}
												exact={route.exact}/>
				})}
				<Redirect to='/login'/>
			</Switch>)
	);
};

export default AppRouter;