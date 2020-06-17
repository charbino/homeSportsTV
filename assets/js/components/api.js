/**
 *
 * @param idSite
 * @returns {Promise<Response>}
 */
export const deleteSite = (idSite) => {
    const url = Routing.generate('site_delete', {id: idSite})

    return fetch(url, {
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json",
            "X-REQUESTED-WITH" :"XMLHttpRequest"
        },
    });
}

/**
 *
 * @param idSite
 * @returns {Promise<Response>}
 */
export const playSite = (idSite) => {
    const url = Routing.generate('site_play', {id: idSite})

    return fetch(url, {
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json",
            "X-REQUESTED-WITH" :"XMLHttpRequest"
        },
    });
}
