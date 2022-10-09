const router = {}

let route
let n = 0

/**
 * @param {string} url - url string
 * @param {function(request,response)} callback  - takes request and resolve
 */

router.get = (url, callback) => {
    if (n > 0) return

    const r_url = url.replace(/\/\*/, "")

    const regexString = `^${r_url}`
    const regex = new RegExp(regexString)

    if (!regex.test(r_url)) {
        return
    }

    const url_path = url.replace(/\/\*/, '').replace(/\?(.*)/, '')

    if (location.pathname !== url_path) {
        return
    }

    //run code
    n++

    const request = {
        protocol: location.protocol,
        hostname: location.host,
        path: location.pathname,
        params: {},
        query: {}
    }

    const queryMatch = location.href.match(/\?(.*)$/) || []
    const queryString = queryMatch[1]
    const searchParams = new URLSearchParams(queryString)
    for (const [key, value] of searchParams) {
        request.query[key] = value
    }

    const response = {
        render: function (html, container) {
            console.log('rendering');
            container.replaceChildren()
            container.insertAdjacentHTML('beforeend', html)

            container.querySelectorAll('a').forEach(a => {
                clickEvent(a)
            })

            const anchorString = window.location.hash.substring(1)
            const anchor = document.getElementById(anchorString);
            if (anchor) {
                anchor.scrollIntoView();
                console.log('end');
            }
        }
    }

    callback(request, response)

}

router.init = (routes, options) => {
    if (typeof (options) !== 'object') {
        options = {}
    }

    route = () => {
        n = 0
        routes()
    }

    if (options.container) {
        options.container.querySelectorAll('a').forEach(a => {
            clickEvent(a)
        })
    } else {
        document.querySelectorAll('a').forEach(a => {
            clickEvent(a)
        })
    }

    route()

    window.onpopstate = (e) => {
        route()
    };
    console.log('ok');
}


function clickEvent(a) {
    a.addEventListener('click', (e) => {
        e.preventDefault()

        if (!a.href) {
            return
        }

        const target_url = new URL(a.href)
        if (target_url.host !== window.location.host) { //target other url
            return
        }

        if (target_url.pathname == window.location.pathname) { //same path
            console.log('???');
            e.preventDefault()
            if (target_url.hash.substring(1)) {
                const anchorString = target_url.hash.substring(1)
                const anchor = document.getElementById(anchorString);
                if (anchor) {
                    anchor.scrollIntoView();
                    console.log('end');
                }
                return
            }

            console.log('reload', target_url.pathname, window.location.pathname);
            //window.location.reload()
        }

        console.log('switch');
        window.history.pushState('', '', a.href)
        route()
    })
}

router.redirect = (e) => {
    console.log('!!');
    e = e || window.e
    e.preventDefault()
    window.history.pushState('', '', e.target.href)
    route()
}

module.exports = router
