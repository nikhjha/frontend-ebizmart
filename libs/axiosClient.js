import axios from "axios";

export const baseURL = "https://ebizmart-backend.herokuapp.com";
// export const baseURL = "http://localhost:4000";
// export const baseURL = "https://55be-183-87-235-254.ngrok.io";

// export const frontUrl = "http://localhost:3000";
export const frontUrl = "https://ebizmart-frontend.vercel.app";

let clientFetch = axios.create({
	baseURL,
});

export const createTokenizedFetch = (token) => {
	clientFetch = axios.create({
		baseURL,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const setNormalFetch = () => {
	clientFetch = axios.create({
		baseURL,
	});
}

export const serverFetch = () => {
	return axios.create({
		baseURL,
	});
};

const getFetch = () => {
	return clientFetch;
};

export default getFetch;
