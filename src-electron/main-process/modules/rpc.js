
const https = require("https")
const axios = require('axios');

export class RPC {
    constructor(){
        this.agent = new https.Agent({ keepAlive: true, maxSockets: 1 })
    }

    async sendRPC (params = {}, options = {}) {
        const protocol = options.protocol || this.protocol
        const hostname = options.hostname || this.hostname
        const port = options.port || this.port
        const endpoint = options.endpoint || this.endpoint
        let requestOptions = {
            url: `${protocol}${hostname}:${port}${endpoint}`,
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
            agent: this.agent
        }
        if (Object.keys(params).length !== 0) {
            requestOptions.json.params = params
        }
        try {
            let response = await axios(requestOptions)
            return {
                params: params,
                result: response.data
            }
        } catch (error) {
            return {
                params: params,
                error: {
                    code: -1,
                    message: "Cannot connect to daemon-rpc",
                    cause: error.response.data.error
                }
            }
        }
    }
}