import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router";
import { isAuthenticated } from "../../context/auth/authenticate";
import Loading from "../../ui/components/loading/Loading";
import Layout from "../../ui/partials/Layout";

function ProtectedRoute({ children }: { children: JSX.Element }) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			const result = await isAuthenticated(navigate);
			setAuthenticated(result);
			setLoading(false);
		};
		checkAuth();
	}, [navigate]);

	if (loading) {
		return <Loading />;
	}

	return authenticated ? (
		<Layout>{children}</Layout>
	) : (
		<Navigate to="/auth" />
	);
}

export default ProtectedRoute;