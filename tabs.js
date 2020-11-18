//Auto call - évite les conflits si une autre fonction porte le même nom
//Portée locale 
(function() {
    /*Lorsque l'on clique sur un onglet :
    - on retire la classe active de l'onglet actif 
    - on ajoute la classe active à l'onglet actuel

    On retire la classe active sur le contenu actif
    On ajoute la classe active sur le contenu correspondant au clic
*/

    var afficherOnglet = function(elmt, animations) {

        if(animations === undefined) {
            animations = true
        }

        var li = elmt.parentNode
        var div = elmt.parentNode.parentNode.parentNode
        //contenu actif
        var activeTab = div.querySelector('.tab-content.active')
        //contenu à afficher
        var aAfficher = div.querySelector(elmt.getAttribute('href'))

        if(li.classList.contains('active')) {
            return false
        }

        //- on retire la classe active de l'onglet actif 
        div.querySelector('.tabs .active').classList.remove('active')
        //- on ajoute la classe active à l'onglet actuel
        elmt.classList.add('active')
        //On retire la classe active sur le contenu actif
        //div.querySelector('.tab-content.active').classList.remove('active')
        //On ajoute la classe active sur le contenu correspondant au clic
        //div.querySelector(elmt.getAttribute('href')).classList.add('active')


        //Partie pour la transition CSS
        /* On ajoute la  classe fade sur l'élément actif
        à la fin de l'animation :
        - on retire la classe fade et active 
        - on ajoute la classe active et fade à l'élément à afficher
        - on ajoute la classe in 
        */

        if (animations) {
            activeTab.classList.add('fade')
            activeTab.classList.remove('in')

            var transitionEnd = function() {
                this.classList.remove('fade')
                this.classList.remove('active')
                aAfficher.classList.add('active')
                aAfficher.classList.add('fade')
                aAfficher.offsetWidth
                aAfficher.classList.add('in')
                activeTab.removeEventListener('transitionend', transitionEnd)
                activeTab.removeEventListener('webkitTransitionEnd', transitionEnd)
                activeTab.removeEventListener('weTransitionEnd', transitionEnd)
                activeTab.removeEventListener('oTransitionEnd', transitionEnd)
            }
            activeTab.addEventListener('transitionend', transitionEnd)
            activeTab.addEventListener('webkitTransitionEnd', transitionEnd)
            activeTab.addEventListener('weTransitionEnd', transitionEnd)
            activeTab.addEventListener('oTransitionEnd', transitionEnd)

        } else {
            aAfficher.classList.add('active')
            activeTab.classList.remove('active')
        }
    }

    var tabs = document.querySelectorAll('.tabs a')

    for(var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function(e) {
            afficherOnglet(this)
        })
    }

    /* Je recupere le hash
        - ajoute la classe active sur le lien href="hash"
        - retirer la classe active sur les autres onglets
        - afficher/masquer les contenus
    */
   

    var hashChange = function (e) {
        var hash = window.location.hash
        var linkHref = document.querySelector('a[href="' + hash + '"]')
        if(linkHref !== null && !linkHref.parentNode.classList.contains('active')) {
            afficherOnglet(linkHref, e !== undefined)
        }
    }

    window.addEventListener('hashchange', hashChange)

    hashChange()


})()