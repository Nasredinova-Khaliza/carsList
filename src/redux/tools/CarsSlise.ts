import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Car {
	_id: number;
	name: string;
	img: string;
	price: number;
}

interface Post {
	id: number;
	name: string;
	img: string;
	price: number;
}
interface Edit {
	name: string;
	img: string;
	price: number;
	_id: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	newData: any;
}

interface CarsListProps {
	loading: boolean;
	error: string | null;
	cars: Car[];
}

const initialState: CarsListProps = {
	loading: false,
	error: null,
	cars: [],
};

const url =
	"https://api.elchocrud.pro/api/v1/800b95db41a74b80a8eba802a66f053a/cars";

export const getCars = createAsyncThunk("cars/getCars", async () => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

export const postCars = createAsyncThunk(
	"cars/postCars",
	async (newCars: Post) => {
		try {
			const response = await axios.post(url, newCars);
			return response.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

export const deleteCars = createAsyncThunk(
	"cars/deleteCars",
	async (id: number) => {
		try {
			const response = await axios.delete(`${url}/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

export const editeRequest = createAsyncThunk(
	"cars/editeRequest",
	async ({ newData, _id }: Edit) => {
		try {
			const response = await axios.patch(`${url}/${_id}`, newData);
			return response.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

export const carsSlice = createSlice({
	name: "cars",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCars.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getCars.fulfilled, (state, action) => {
				state.loading = false;
				state.cars = action.payload;
			})
			.addCase(getCars.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			.addCase(postCars.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.cars = [];
			})
			.addCase(postCars.fulfilled, (state, action) => {
				state.loading = false;
				state.cars = action.payload;
			})
			.addCase(postCars.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			.addCase(deleteCars.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.cars = [];
			})
			.addCase(deleteCars.fulfilled, (state, action) => {
				state.loading = false;
				state.cars = action.payload;
			})
			.addCase(deleteCars.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			.addCase(editeRequest.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.cars = [];
			})
			.addCase(editeRequest.fulfilled, (state, action) => {
				state.loading = false;
				state.cars = action.payload;
			})
			.addCase(editeRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			});
	},
});

export const carsReducer = carsSlice.reducer;
