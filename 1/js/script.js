import { movies } from '../module/db.js'

let ul = document.querySelector('.promo__interactive-list')
let modal = document.querySelector('.modal')
let modal_bg = document.querySelector('.modal_bg')
let search = document.querySelector('#search')
let button = document.querySelector('.btn')
let promo = document.querySelector('.promo')
let promo__genre  = document.querySelector('.promo__genre')
let promo__title = document.querySelector('.promo__title')
let promo__descr = document.querySelector('.promo__descr')
let rate = document.querySelector('.rate')
let promo__content = promo.querySelector('.promo__content')
let promo__bg = promo__content.querySelector('.promo__bg')
let genres = document.querySelector('.genres')
let genresArr = ['all']
const moviesListArea = document.querySelector('.promo__interactive-list')








reload(movies)

function reload(arr) {
    ul.innerHTML = ""
    moviesListArea.innerHTML = ''


    for (let item of arr) {
        genresArr.push(item.genres)
        let li = document.createElement('li')
        let del = document.createElement('div')

        li.classList.add('promo__interactive-item')
        del.classList.add('delete')
        del.setAttribute('id', item.ID)

        del.onclick = (event) => {
            let id = event.target.id

            closeModal()
            let filtered = arr.filter(item => item.ID !== id)

            reload(filtered)
        }

        li.innerHTML = arr.indexOf(item) + 1 + '.' + item.Title

        li.append(del)
        ul.append(li)

        li.onclick = () => {
            openModal(item)
        }
       
    }


}



search.onkeyup = () => {
    let filtered = movies.filter(item => item.Title.toLowerCase().includes(search.value.toLowerCase().trim()))
    reload(filtered)
    foto()
}

function closeModal() {
    modal.style.transform = "translate(-50%, -50%) scale(.2)"
    modal.style.opacity = "0"
    modal_bg.style.opacity = "0"
    
    setTimeout(() => {
        modal.style.display = "none"
        modal_bg.style.display = "none"
    }, 300);
}

function openModal(data) {
    let rette = modal.querySelector('.rette')
    rette.innerHTML = ''
    setData(data)
    modal.style.display = "flex"
    modal_bg.style.display = "block"
 
    setTimeout(() => {
        modal.style.opacity = "1"
        modal.style.transform = "translate(-50%, -50%) scale(1)"
        modal_bg.style.opacity = "1"
    }, 300);
    promo__bg.style.backgroundImage = `url(${data.img})`
    promo__title.innerHTML = data.Title
    promo__descr.innerHTML = data.Plot.slice(0, 100) + ' ...'
    promo__genre.innerHTML = data.Genre
    rate.innerHTML = `IMDb: ${data.imdbRating}`

}
function setData(data) {
    
    let h1 = modal.querySelector('h1')
    let h2 = modal.querySelector('h2')
    let h3 = modal.querySelector('h3')
    let p = modal.querySelector('p')
    let img = modal.querySelector('img')
    let rette = modal.querySelector('.rette')

    h1.innerHTML = data.Title

    
    

    h2.innerHTML = data.Year
    h3.innerHTML = data.Genre
    p.innerHTML = data.Plot
    img.src = data.Poster
    for (let i = 1; i <= Math.round(data.imdbRating); i++) {
        let stars = document.createElement('img')
        rette.append(stars)
        
    }
}



button.onclick = () => {
    closeModal()
}
genresArr = [...new Set(genresArr)]

for(let item of genresArr) {
    let li = document.createElement('li')
    let a = document.createElement('a')

    if(genresArr.indexOf(item) == 0) {
        a.classList.add('promo__menu-item_active')
    }
    a.setAttribute('id', item.Id)
    a.classList.add('promo__menu-item')
    a.innerHTML = item

    li.append(a)
    genres.append(li)
}

let a_genre = document.querySelectorAll('.promo__menu-item')

a_genre.forEach(element => {
    element.onclick = () => {
        a_genre.forEach(item => item.classList.remove('promo__menu-item_active'))
        element.classList.add('promo__menu-item_active')


        searchByGenre(element.innerHTML)
    }
});
let searchByGenre = (genre) => {
    if(genre !== 'all') {
        let filtered = movies.filter(item => item.genres.toLowerCase() === genre.toLowerCase().trim()  )
        reload(filtered)
    } else {
        reload(movies)
    }
}

