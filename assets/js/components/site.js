import {deleteSite} from './api';

export default () => {
    bindBtnsDelete();

}

const bindBtnsDelete = () => {
    const btnsDelete = document.getElementsByClassName('delete-site');
    Array.from(btnsDelete).forEach(btn => {
        btn.addEventListener('click', function (event) {
            const idSite = event.target.dataset.site;

            deleteSite(idSite)
                .then(function (data) {
                    removeDivSite(idSite);
                })
                .catch(function (error) {
                    console.log('Error when call delete api : ', error)
                });
        })
    });

}
/**
 *
 * @param idSite
 */
const removeDivSite = (idSite) => {
    let element = document.getElementById("site-" + idSite);
    element.parentNode.removeChild(element);
}
