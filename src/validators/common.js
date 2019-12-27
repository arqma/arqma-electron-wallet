/* eslint-disable prefer-promise-reject-errors */

export const greater_than_zero = (input) => {
    return input > 0
}

export const payment_id = (input) => {
    return input.length === 0 || (/^[0-9A-Fa-f]+$/.test(input) && (input.length == 16 || input.length == 64))
}

export const privkey = (input) => {
    return input.length === 0 || (/^[0-9A-Fa-f]+$/.test(input) && input.length == 64)
}

export const service_node_key = (input) => {
    return input.length === 64 && /^[0-9A-Za-z]+$/.test(input)
}

export const address = (input) => {
    // Validate the address
    return new Promise((resolve, reject) => {
        try {
            if (/^[0-9A-Za-z]+$/.test(input)) {
                switch(input.substring(0,3)) {
                    case "aRi":
                        resolve(input.length === 109)
                        break
                    case "ar2":
                        resolve(input.length === 97)
                        break
                    case "ar3":
                        resolve(input.length === 97)
                        break
                    case "ar4":
                        resolve(input.length === 97)
                        break
                    case "ar5":
                        resolve(input.length === 97)
                        break
                    case "aRS":
                        resolve(input.length === 98)
                        break

                    default:
                        resolve(false)
                }
            } else {
               resolve(false)
            }
        } catch(e) {
            resolve(false)
        }
    })
}
