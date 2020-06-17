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
