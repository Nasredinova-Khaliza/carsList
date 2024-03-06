/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/store/store";
import { getCars, postCars } from "../redux/tools/CarsSlise";
import CarsItem from "./CarsItem";
import scss from "./CarsList.module.scss";

const CarsList = () => {
	const dispatch = useAppDispatch();
	const [carName, setCarName] = useState<string>("");
	const [carImg, setCarImg] = useState<string>("");
	const [carPrice, setCarPrice] = useState<number>(0);
	const addCars = () => {
		if (carName === "" || carImg === "" || carPrice === 0) {
			alert("заполните пустые инпуты");
		} else {
			const newCars = {
				id: Math.random(),
				name: carName,
				img: carImg,
				price: carPrice,
			};
			dispatch(postCars(newCars));
		}
		setCarName("");
		setCarImg("");
		setCarPrice(0);
	};

	useEffect(() => {
		dispatch(getCars());
	}, []);
	return (
		<>
			<div className={scss.InputContainer}>
				<input
					type="text"
					placeholder="Car Name"
					value={carName}
					onChange={(e) => setCarName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Car Image"
					value={carImg}
					onChange={(e) => setCarImg(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Car Name"
					value={carPrice}
					onChange={(e) => setCarPrice(+e.target.value)}
				/>
				<button
					onClick={() => {
						addCars();
					}}>
					add
				</button>
			</div>
			<CarsItem />
		</>
	);
};

export default CarsList;
