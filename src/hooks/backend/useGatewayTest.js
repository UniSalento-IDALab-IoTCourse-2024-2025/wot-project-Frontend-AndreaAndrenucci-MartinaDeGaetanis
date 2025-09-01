import axios from "axios";
import { BASE_URL } from "../../constants/backend_ops";

const url = BASE_URL + "/api/gateway-test"

const tryGatewayConn = async () => {
    const response = await axios.get(url);
    // console.log("GATEWAY CONN",response)
    return response?.status == 200 ? true : false
}

export {tryGatewayConn}