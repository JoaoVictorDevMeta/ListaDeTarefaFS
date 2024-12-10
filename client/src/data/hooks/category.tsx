import { useEffect, useState } from "react";
import { fetchAllCategories } from "../services/allCategories";
import { categoryType } from "../types/category";

function useCategory() {
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState<categoryType[]>([]);
	const [error, setError] = useState(null);
	const token = localStorage.getItem("token") || "";

	useEffect(() => {
		const fetchCategory = async () => {
			setLoading(true);
			try {
				const response = await fetchAllCategories(token);
				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.message);
				}
				return setCategories(data);
			} catch (err: any) {
				console.error(err);
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchCategory();
	}, []);

	return { loading, categories, error };
}

export default { useCategory };
