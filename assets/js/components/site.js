import {deleteSite, playSite} from './api';

export default () => {
    bindBtnsDeleteBefore();
    bindBtnsDelete();
    bindBtnsPlay();
}

const bindBtnsDeleteBefore = () => {
    const btnsDelete = document.getElementsByClassName('delete-site-before');
    Array.from(btnsDelete).forEach(btn => {
        btn.addEventListener('click', function (event) {
            const idSite = event.target.dataset.site;
            const btnDelete = getBtnDelete();
            btnDelete.dataset.site = idSite;
        })
    });
}


const bindBtnsDelete = () => {
    const btnDelete = getBtnDelete();
    btnDelete.addEventListener('click', function (event) {
        const idSite = event.target.dataset.site;
        closeModalDelete();
        deleteSite(idSite)
            .then(function (data) {
                removeDivSite(idSite);

            })
            .catch(function (error) {
                console.log('Error when call delete api : ', error)
            });
    });
}

const bindBtnsPlay = () => {
    const btnsPlay = document.getElementsByClassName('play-site');
    Array.from(btnsPlay).forEach(btn => {
        btn.addEventListener('click', function (event) {
            const idSite = event.target.dataset.site;
            const btnProgress = document.getElementById('btn-inprogress-' + idSite);
            const btnPlay = document.getElementById('btn-play-' + idSite);

            toggleBtns(btnPlay, btnProgress);
            playSite(idSite)
                .then(response => response.json())
                .then(function (data) {
                    toggleBtns(btnPlay, btnProgress);
                })
                .catch(function (error) {
                    console.log('Error when call delete api : ', error)
                });
        })
    });
}
const getBtnDelete = () => {
    return document.getElementById('delete-site');
}

const getModalDelete = () => {
    return document.getElementById('modalDelete');
}


const closeModalDelete = () => {
    $('#modalDelete').modal('hide');
}

/**
 *
 * @param idSite
 */
const removeDivSite = (idSite) => {
    let element = document.getElementById("site-" + idSite);
    element.parentNode.removeChild(element);
}

const toggleBtns = (btnPlay, btnProgress) => {
    console.log(btnPlay)
    btnProgress.hidden = !btnProgress.hidden;
    btnPlay.hidden = !btnPlay.hidden;
}

