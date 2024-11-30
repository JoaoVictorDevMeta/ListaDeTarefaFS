import { useState, ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaGear } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import "./layout.scss";
import Button from "../components/buttons/Button";

//logic
import { logout } from "../../context/auth/logout";

interface NavbarProps {
	children: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
	const [navOpen, setNavOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout(navigate);
	};

	return (
		<div className="app-container">
			<div className="app-content">
				<header>
					<div>
						<button
							className="btn-icon"
							onClick={() => {
								setNavOpen(!navOpen);
							}}
						>
							<GiHamburgerMenu />
						</button>
						<Link to="/">{/*Logo here*/}</Link>
					</div>
					<button className="btn-icon">
						<FaGear />
					</button>
				</header>
				<div className={`nav-bar-drawer ${navOpen ? "nav-open" : ""}`}>
					<div className="nav-bar-header"></div>
					<nav>
						<div className="nav-section">
							<h4>Principal</h4>
							<ul>
								<li>
									<Link to="/">
										<span>
											<MdDashboard />
										</span>
										<p>Início</p>
									</Link>
								</li>
								<li>
									<Link to="/categories">
										<span>
											<FaList />
										</span>
										<p>Categorias</p>
									</Link>
								</li>
							</ul>
						</div>
						<div className="nav-section">
							<h4>Ações</h4>
							<ul>
								<li>
									<Link to="/post">
										<span>
											<FaPlusCircle />
										</span>
										<p>Nova tarefa</p>
									</Link>
								</li>
							</ul>
						</div>
						<div className="footer">
							<Button
								label="Sair"
								type="fill"
								color="light"
								width="100px"
								minWidth="100px"
								onClick={handleLogout}
							/>
							<p>@ Lista-Tarefa, JV</p>
						</div>
					</nav>
				</div>
				<main>
					<div className="main-section-header"></div>
					<section>{children}</section>
				</main>
			</div>
		</div>
	);
};

export default Navbar;
