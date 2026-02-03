import axios from 'axios'


export const apiSubmitForm = async (playerData) => {

    try {
        const resp = await axios.post(
            'https://5paq22zotg.execute-api.us-east-1.amazonaws.com/prod/saveplayer',
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
            "https://3ceod7mt8d.execute-api.us-east-1.amazonaws.com/prod/create_order",
            {
                headers: {
                    'Content-Type': 'application/json',
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
            'https://5egpoykfxf.execute-api.us-east-1.amazonaws.com/prod/listplayer',
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        console.log(resp)
        return resp.data;
    } catch (err) {
        console.log("api Error", err)
        return err;
    }
}
