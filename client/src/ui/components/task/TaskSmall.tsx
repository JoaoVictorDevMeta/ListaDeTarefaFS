import Checkbox from "../../components/inputs/checkbox";
import { Link } from "react-router";
import { convertDate } from "../../../data/utils/convertDate";

interface TaskSmallProps {
	taskId: number;
	title: string;
	categoryName?: string;
	categoryColor?: string;
	nextDate: string;
    status: boolean;
}

export const TaskSmall = ({
	taskId,
	title,
	categoryName = "Task",
	categoryColor = "",
	nextDate,
    status,
}: TaskSmallProps) => {
	return (
		<li className="task-small">
			<Checkbox color="#254e91" size={25} checked={status}/>
			<h5>
				<Link to={`/task/${taskId}`}>{title}</Link>
			</h5>
			<p>{convertDate(nextDate)}</p>
			<Link to="#" className="category-link">
				{categoryName}
			</Link>
		</li>
	);
};
