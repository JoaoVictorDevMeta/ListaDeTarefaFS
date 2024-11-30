import { BrowserRouter as Router, Routes, Route } from "react-router";

//pages
import AuthPage from "./pages/Auth/Page";
import HomePage from "./pages/Home/Page";
import CalendarPage from "./pages/Calendar/Page";
import CategoriesPage from "./pages/Categories/Page";
import TaskPage from "./pages/Task/Page";
import PostPage from "./pages/Task/Page";

//auth control
import ProtectedRoute from "./data/hooks/protectRoute";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/auth" element={<AuthPage />} />
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/calendar"
					element={
						<ProtectedRoute>
							<CalendarPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/categories"
					element={
						<ProtectedRoute>
							<CategoriesPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/post"
					element={
						<ProtectedRoute>
							<PostPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/singleTask"
					element={
						<ProtectedRoute>
							<TaskPage />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
