import CarsList from "../CarsList";
import scss from "./Layout.module.scss";

const Layout = () => {
	return (
		<div className={scss.Layout}>
			<main className={scss.main}>
				<h1>YOU CAN SAVE YOUR FAVORITE CAR HERE 💫✨</h1>
				<CarsList />
			</main>
		</div>
	);
};

export default Layout;
