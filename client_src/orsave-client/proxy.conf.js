const PROXY_CONFIG = [
    {
        context: [
            "/api"
        ],
        target: "http://localhost:7337/",
        secure: false,
        // headers: { "Cookie": 'JSESSIONID=31FDE7E9CF0DBEE20ED3F3CFFEA2E1CE' }
    }
]

module.exports = PROXY_CONFIG;
