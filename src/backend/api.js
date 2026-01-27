import axios from 'axios'

import { baseURL } from "./axios"

export const apiSubmitForm = async (playerData) => {

    try {
        const response = await axios.post(
            baseURL + '/api/formsubmit',
            { playerData },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        console.log(response.data)
    } catch (err) {
        console.log("api Error", err)
        return {}
    }
}
