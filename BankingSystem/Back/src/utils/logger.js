// instead of console logging over the place, keep everything in here

const info = (...params) => {
    if (process.env.NODE_ENV !== "test"){
        console.log(...params)
    }
}

const error = (...params) => {
    if (process.env.NODE_ENV !== "test"){
        console.error(...params)
    }
}

module.exports = {info, error}