import { ZMQ_PLAIN_PASSWORD } from "zeromq"

const https = require("https")
const http = require("http")
const fetch = require("node-fetch")
const DigestFetch = require("digest-fetch")

export class RPC {
    constructor(protocol, hostname, port){
        this.protocol = protocol
        this.hostname = hostname
        this.port = port
    }

    setAuthorization(username, password) {
        this.username = username
        this.password = password
        this.client = new DigestFetch(this.username, this.password, {algorithm: 'MD5'})
        return this
    }

    async callAPI (params = {}, options = {}) {
        const protocol = options.protocol || this.protocol
        const hostname = options.hostname || this.hostname
        const port = options.port || this.port
        const endpoint = options.endpoint || this.endpoint
        let url = `${protocol}${hostname}:${port}${endpoint}`
        let requestOptions = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
            agent: new https.Agent({ keepAlive: true, maxSockets: 1 })
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

    async sendRPC (method, params = {}, uri = false) {
        let id = this.id++
        let url = uri ? uri : `${this.protocol}${this.hostname}:${this.port}/json_rpc`
        let body = {
            jsonrpc: "2.0",
            id: id,
            method: method,
        }
        let options = {
            method: "POST",
            agent: new http.Agent({ keepAlive: true, maxSockets: 1 })
        }
        if (Array.isArray(params) || Object.keys(params).length !== 0) {
            body.params = params
        }

        options.body = JSON.stringify(body)
        try {
            let response = await fetch(url, options)
            let data = await response.json()
            return {
                method: method,
                params: params,
                result: data.result
            }
        }catch(error) {
            console.log(error)
            return {
                method: method,
                params: params,
                error: {
                    code: -1,
                    message: "Cannot connect to rpc",
                    cause: error.errno
                }
            }
        }
    }

    async sendRPC_WithMD5 (method, params = {}, timeout = 0) {
        let id = this.id++
        let url = `${this.protocol}${this.hostname}:${this.port}/json_rpc`
        let body = {
            jsonrpc: "2.0",
            id: id,
            method: method,
        }
        let options = {
            method: "POST",
            agent: new http.Agent({ keepAlive: true, maxSockets: 1 })
        }
        if (Object.keys(params).length !== 0) {
            body.params = params
        }
        if (timeout) {
            options.timeout = timeout
        }

        options.body = JSON.stringify(body)

        try {
            let response = await this.client.fetch(url, options)
            let data = await response.json()
            return {
                method: method,
                params: params,
                result: data.result
            }
        }catch(error) {
            return {
                method: method,
                params: params,
                error: {
                    code: -1,
                    message: "Cannot connect to wallet-rpc",
                    cause: error.errno
                }
            }
        }
    }

}