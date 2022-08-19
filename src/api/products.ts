import axios from "axios"

export const fetchProduct = async (colour?: string) => {
    const resp = await axios.get(`${process.env.REACT_APP_API_URL}/benirvingplt/products/products${ colour ? '?colour=' + colour : '' }`);   
    return resp.data;
}