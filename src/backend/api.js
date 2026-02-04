import axios from 'axios'


const submit_form_url = 'https://5paq22zotg.execute-api.us-east-1.amazonaws.com/prod/saveplayer';
const create_order_url = "https://3ceod7mt8d.execute-api.us-east-1.amazonaws.com/prod/create_order"
const list_players_url = 'https://5egpoykfxf.execute-api.us-east-1.amazonaws.com/prod/listplayer'

export const apiSubmitForm = async (playerData) => {

    try {
        const resp = await axios.post(
            submit_form_url,
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
            create_order_url,
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
            list_players_url,
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
