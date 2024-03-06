/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import scss from "./CarsItem.module.scss";
import { deleteCars, editeRequest } from "../redux/tools/CarsSlise";

const CarsItem = React.memo(() => {
	const carsList = useAppSelector((state) => state.CarsList.cars);
	const dispatch = useAppDispatch();
	const [editedCarId, setEditedCarId] = useState<number>(0);
	const [editedCarName, setEditedCarName] = useState<string>("");
	const [editedCarImg, setEditedCarImg] = useState<string>("");
	const [editedCarPrice, setEditedCarPrice] = useState<number>(0);

	const deleteCar = (id: number) => {
		dispatch(deleteCars(id));
	};

	const editRequest = (item: any) => {
		console.log("Edite ");
		setEditedCarId(item._id);
		setEditedCarName(item.name);
		setEditedCarImg(item.img);
		setEditedCarPrice(item.price);
	};

	const saveEdit = (_id: number) => {
		console.log("save Edite");

		const newData = {
			name: editedCarName,
			img: editedCarImg,
			price: editedCarPrice,
		};

		dispatch(
			editeRequest({
				newData,
				_id,
				name: "",
				img: "",
				price: 0,
			})
		);

		setEditedCarId(0);
		setEditedCarName("");
		setEditedCarImg("");
		setEditedCarPrice(0);
	};

	const cancelEdit = () => {
		setEditedCarId(0);
		setEditedCarName("");
		setEditedCarImg("");
		setEditedCarPrice(0);
	};
	return (
		<div className={scss.cards}>
			{carsList.map((item) =>
				editedCarId === item._id ? (
					<div key={item._id} className={scss.editeContent}>
						<input
							type="text"
							value={editedCarName}
							onChange={(e) => setEditedCarName(e.target.value)}
						/>
						<input
							type="text"
							value={editedCarImg}
							onChange={(e) => setEditedCarImg(e.target.value)}
						/>
						<input
							type="number"
							value={editedCarPrice}
							onChange={(e) => setEditedCarPrice(parseInt(e.target.value))}
						/>
						<button onClick={cancelEdit}>Cancel</button>
						<button onClick={() => saveEdit(item._id)}>Save</button>
					</div>
				) : (
					<div key={item._id} className={scss.card}>
						<h4>Car name: {item.name}</h4>
						<img src={item.img} alt={item.name} />
						<p>Price: {item.price}</p>
						<button onClick={() => deleteCar(item._id)}>Delete</button>
						<button onClick={() => editRequest(item)}>Edit</button>
					</div>
				)
			)}
		</div>
	);
});

export default CarsItem;
