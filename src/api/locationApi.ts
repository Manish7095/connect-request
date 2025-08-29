import axios from "axios";

const BASE_URL = "http://192.168.1.46:5000/api";

export interface State {
    stateCode: string;
    state: string;
}

export interface City {
    id: number;
    name: string;
}

export const getStates = async (): Promise<State[]> => {
    const res = await axios.get(`${BASE_URL}/v2/states`);
    return res.data.data.states;
};

export const getCities = async (stateName: string) => {
    const res = await axios.get(`${BASE_URL}/v2/cities`, {
        params: { stateName },
    });
    return res.data.data.cities;
};
