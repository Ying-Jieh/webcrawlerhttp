const { JSDOM } = require('jsdom') // For getting urls from HTML

async function crawlPage(baseURL, currentURL, pages) {
    // recursively crawling the pages
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    // base case
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)

    // if we've already visited this page
    // just increase the count and don't repeat the http request
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1

    // fetch and parse the html of the currentURL
    console.log(`actively crawling: ${currentURL}`)
    try {
        const resp = await fetch(currentURL) // defaul action is GET
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status}, on page: ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`non html respose, content type: ${contentType}, on page: ${currentURL}`)
            return pages
        }
        const htmlBody = await resp.text()
        const nextURLs = getURLsFromHTML(htmlBody, baseURL)
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }
    } catch (err) {
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }
    return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody) // creates a new "document object model"
    const linkElements = dom.window.document.querySelectorAll('a') // returns an array of "a" tag elements
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            // relative
            try {
                const urlObj = new URL(linkElement.href, baseURL) // URL() raises error if pass an invalid url
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
            
        } else {
            // absolute
            try {
                const urlObj = new URL(linkElement.href)
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
    const fullPath = `${urlObj.hostname}${urlObj.pathname}`
    if (fullPath.length >= 0 && fullPath.slice(-1) === '/') {
        return fullPath.slice(0, -1)
    } 
    return fullPath

}

// export functions so that other js files can import them
module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}