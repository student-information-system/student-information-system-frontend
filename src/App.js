import React from "react";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import GradeList from './components/GradeList';
function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Navigate replace to="/login" />} />
					<Route path="/login" element={<Login/>} />
					<Route path="/home" element={<Home/>} />
					<Route path="/dashboard" element={<Dashboard/>} />
					<Route path="/gradeList" element={<GradeList/>} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
