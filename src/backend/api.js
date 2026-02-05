import axios from 'axios'

const BASE_URL = "https://p24nbg0us3.execute-api.us-east-1.amazonaws.com/stage";


export const apiSubmitForm = async (playerData) => {
    try {
        const resp = await axios.post(
            BASE_URL + "/saveplayer",
            playerData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                }
            }
        )
        console.log(resp)
        return resp;
    } catch (err) {
        console.log("api Error", err)
        return err;
    }
}

export const apiCreateOrder = async () => {

    try {
        const resp = await axios.post(
            BASE_URL + "/create_order",
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                }
            }
        )
        console.log(resp)
        return resp;
    } catch (err) {
        console.log("api Error", err)
        return err;
    }
}

export const apiListPlayers = async () => {

    try {
        const resp = await axios.get(
            BASE_URL + "/listplayer",
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                }
            }
        )
        console.log(resp)
        return resp;
    } catch (err) {
        console.log("api Error", err)
        return err;
    }
}


export const apiSaveFile = async (formData) => {
    try {
        const resp = await axios.post(
            BASE_URL + "/save_file",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        console.log(resp);
        return resp;
    } catch (err) {
        console.error(err);
        return err;
    }
}

export const apiGetFile = async (file_name) => {
    try {
        const res = await axios.get(
            BASE_URL + "/get_file",
            { params: { file_name: file_name } });
        console.log(res)
        return res.data.url;
    } catch (err) {
        console.error(err);
        return err;
    }
}