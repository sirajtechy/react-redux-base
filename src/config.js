// const {protocol,hostname} = window.location
const PORT = global.PORT

/**
 * globally available enviornments comes from webpack build settings .
 */
const config = {
    apiBaseUrl: `http://localhost:${PORT}`
}

export default config