
const https = require("https")
const fetch = require("node-fetch")

export class RPC {
    constructor(){
        this.agent = new https.Agent({ keepAlive: true, maxSockets: 1 })
    }

    async sendRPC (params = {}, options = {}) {
        const protocol = options.protocol || this.protocol
        const hostname = options.hostname || this.hostname
        const port = options.port || this.port
        const endpoint = options.endpoint || this.endpoint
        const url = `${protocol}${hostname}:${port}${endpoint}`
        let requestOptions = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
            agent: this.agent
        }
        if (Object.keys(params).length !== 0) {
            requestOptions.body = JSON.stringify(params)
        }
        try {
            let response = await fetch(url, requestOptions)
            return {
                params: params,
                result: await response.json()
            }
        } catch (error) {
            return {
                params: params,
                error: {
                    code: -1,
                    message: "Cannot connect to daemon-rpc",
                    cause: error.errno
                }
            }
        }
    }
}