import axios from 'axios'

import { baseURL } from "./axios"

export const apiSubmitForm = async (playerData) => {

    try {
        const resp = await axios.post(
            baseURL + '/saveplayer',
            playerData,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        console.log(resp.data)
        return resp;
    } catch (err) {
        console.log("api Error", err)
        return err;
    }
}
