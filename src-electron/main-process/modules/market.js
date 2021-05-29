/**
 * arqma-electron-wallet
 * https://github.com/arqma/arqma-electron-wallet
 *
 * market.js
 *
 **/

const https = require("https")

const axios = require('axios');

export class Market {
    constructor (backend) {
        this.backend = backend
        this.heartbeat_slow = null
        this.id = 0

        this.agent = new https.Agent({ keepAlive: true, maxSockets: 1 })
        this.options = null
        this.endpoint = "/api/v3/coins/arqma/tickers"
    }

    start (options) {
        return new Promise((resolve, reject) => {
            this.options = options
            resolve()
        })
    }

    handle (data) {
        switch (data.method) {
        case "open_wallet":
            this.startHeartbeat()
            break
        case "close_wallet":
            clearInterval(this.heartbeat)
            clearInterval(this.heartbeat_slow)
            break
        default:
        }
    }

    startHeartbeat () {
        clearInterval(this.heartbeat_slow)
        this.heartbeat_slow = setInterval(() => {
            this.heartbeatSlowAction()
        }, 2 * 60 * 1000) // 2 minutes
        this.heartbeatSlowAction()
    }

    heartbeatSlowAction () {
        this.sendRPC({}, this.options.market.exchange)
            .then(response => {
                try {
                    let data = []
                    for (let ticker of response.result.tickers) {
                        let key = ticker.market.name
                        let symbol = ticker.target // btc
                        let label = `${key} ${symbol}`
                        let price = +ticker.last
                        if (price === 0) continue
                        data.push({ key: label, label: label, symbol: symbol, value: price })
                    }
                    this.sendGateway("set_market_data", { info: { exchanges: data } })
                } catch (error) {}
            })
    }

    sendGateway (method, data) {
        this.backend.send(method, data)
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

    quit () {
        clearInterval(this.heartbeat)
        clearInterval(this.heartbeat_slow)
        return new Promise((resolve, reject) => {
            resolve()
        })
    }
}
