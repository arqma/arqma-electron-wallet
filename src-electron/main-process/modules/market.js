/**
 * arqma-electron-wallet
 * https://github.com/arqma/arqma-electron-wallet
 *
 * market.js
 * 
 **/

import child_process from "child_process"
const request = require("request-promise")
const queue = require("promise-queue")
const https = require("https")

export class Market {
    constructor (backend) {
        this.backend = backend
        this.heartbeat_slow = null
        this.id = 0

        this.agent = new https.Agent({ keepAlive: true, maxSockets: 1 })
        this.queue = new queue(1, Infinity)
    }

    start (options) {

        return new Promise((resolve, reject) => {
            resolve()
        })
    }

    handle (data) {
        let params = data.data
        switch (data.method) {
            case "open_wallet":
                this.startHeartbeat()
                break
            case "close_wallet":
                this.clearInterval(this.heartbeat)
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
        let options = {protocol: 'https://', 
                       hostname: 'api.coingecko.com', 
                       port: 443}

        this.sendRPC('arqma', {}, options)
            .then(response => {
                let result = JSON.parse(response.result.toLowerCase())
                let data = {}
                for (let ticker in result.tickers) {
                    let target = result.tickers[ticker].target
                    let symbol = result.tickers[ticker].base

                    let price = +result.tickers[ticker].last
                    if (price === 0) continue;

                    if (!data[symbol]) data[symbol] = {};
                    data[symbol][target] = price;
                }
                this.sendGateway("set_market_data", {info: data})
            });
    }

    sendGateway (method, data) {
        this.backend.send(method, data)
    }

    sendRPC (coin, params = {}, options = {}) {
        let id = this.id++

        const protocol = options.protocol || this.protocol
        const hostname = options.hostname || this.hostname
        const port = options.port || this.port

        let requestOptions = {
            uri: `${protocol}${hostname}:${port}/api/v3/coins/${coin}/tickers`,
            method: "GET",
            // json: {
            //     jsonrpc: "2.0",
            //     id: id,
            //     method: method
            // },
            headers : { 
                        'Accept': 'application/json'
                     },
            agent: this.agent
        }
        if (Object.keys(params).length !== 0) {
            requestOptions.json.params = params
        }
        return this.queue.add(() => {
            return request(requestOptions)
                .then((response) => {
                    if (response.hasOwnProperty("error")) {
                        return {
                            // method: method,
                            params: params,
                            error: response.error
                        }
                    }
                    return {
                        // method: method,
                        params: params,
                        result: response
                    }
                }).catch(error => {
                    return {
                        // method: method,
                        params: params,
                        error: {
                            code: -1,
                            message: "Cannot connect to daemon-rpc",
                            cause: error.cause
                        }
                    }
                })
        })
    }

    quit () {
        clearInterval(this.heartbeat)
        return new Promise((resolve, reject) => {
            resolve()
        })
    }
}
