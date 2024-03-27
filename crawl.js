const { JSDOM } = require('jsdom') // For getting urls from HTML

async function crawlPage(currentURL) {
    console.log(`actively crawling: ${currentURL}`)
    try {
        const resp = await fetch(currentURL) // defaul action is GET
        
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status}, on page: ${currentURL}`)
            return
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`non html respose, content type: ${contentType}, on page: ${currentURL}`)
            return
        }
        
        // console.log(await resp.text())

    } catch (err) {
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }
    
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody) // creates a new "document object model"
    const linkElements = dom.window.document.querySelectorAll('a') // returns an array of "a" tag elements
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            // relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`) // URL() raises error if pass an invalid url
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
            
        } else {
            // absolute
            try {
                const urlObj = new URL(`${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`)
            }
        }
        
    }
    return urls
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString) // using built-in function to create a new url object
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length >= 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    } 
    return hostPath

}

// export functions so that other js files can import them
module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}