let textarea = document.querySelector('.textarea')
let calculate = document.querySelector('.calculate')
let reset = document.querySelector('.reset')
let load = document.querySelector('.load')
let display = document.querySelector('.display')
let search = document.querySelector('.search')
let letter = document.querySelector('.letter')
let ending = document.querySelector('.ending')
let option = document.querySelector('.options')
let letterToggle = document.querySelector('.letter_toggle')
let endingToggle = document.querySelector('.ending_toggle')

window.addEventListener('scroll', e => windowScroll(e))
textarea.addEventListener('load', e => textarea.value = e.target.value)
load.addEventListener('change', e => loadFile(e.target.files[0]))
calculate.addEventListener('click', e => counterTriger(e, 'calc'))
reset.addEventListener('click', e => {
    e.preventDefault();
    textarea.value = ''
    counterTriger(e, 'calc')
})
search.addEventListener('input', e => counterTriger(e, 'search'))
letter.addEventListener('input', e => counterTriger(e, 'filt'))
ending.addEventListener('input', e => counterTriger(e, 'filt'))
letterToggle.addEventListener('change', e => letter.value.length > 0 && counterTriger(e, 'filt', letter.value))
endingToggle.addEventListener('change', e => ending.value.length > 0 && counterTriger(e, 'filt', ending.value))

let totalWords = 0
let totalUniqueWords = 0
let wordsArray = []
let isLetterFilter = false
let isEndingFilter = false
let isSearchFilter = false

function counterTriger(e, trigger, value) {

    e.preventDefault()

    // set value if value not set
    value = (value !== undefined) ? value : e.target.value

    totalWords = 0
    totalUniqueWords = 0
    isLetterFilter = letter.value > 0
    isEndingFilter = ending.value.length > 0
    isSearchFilter = search.value.length > 0
    let words = []

    // get an array of words
    // calculate, filter of search
    switch (trigger) {
        case
        'calc' :
            words = wordsCounter(textarea.value)
            break
        case
        'search':
            words = searchFilter(wordsArray, value)
            break
        /*        case
                'lett':
                    words = letterFilter(wordsArray, value)
                    break
                case
                'end':
                    words = endingFilter(wordsArray, value)
                    break*/
        case
        'filt':
            words = wordsArray

            if (isLetterFilter) {
                value = letter.value
                words = letterFilter(words, value)
            }
            if (isEndingFilter) {
                value = ending.value
                words = endingFilter(words, value)
            }
            break
    }

    // clear display
    display.innerHTML = ''

    // if words array not empty
    // handle every word
    // convert to capitalize
    // new display
    if (words.length > 0) {
        words.forEach((el, i) => {
            let word = el[0]
            let amount = el[1]
            word = word[0].toUpperCase() + word.slice(1)

            // render words
            display.insertAdjacentHTML('beforeend', `
             <div class="word">
                <p>${word}</p>
                <p> ${amount}</p>
            </div>`)

            // count the number of unique words
            // count the number of total words
            totalUniqueWords++
            totalWords = totalWords + amount
        })
    } else {
        display.insertAdjacentHTML('beforeend', `
             <div class="not_found">
                <p>Not Found</p>
            </div>`)
    }

    // render statistics of words
    display.insertAdjacentHTML('afterbegin', `
        <p class="total">Total words : ${totalWords}</p>
        <p class="total">Total unique words : ${totalUniqueWords}</p>
    `)

    scorll('.display')

}

/*                                                      Counter                                                       */

function wordsCounter(text) {

    // remove all punctuation
    // remove space
    // convert to lowercase
    // add to array
    text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()–«»?—]/g, "")
    text = text.replace(/\s+/g, ' ').trim().toLowerCase()
    text = text.split(' ')

    // get unique words in object
    // get amount unique words
    let wordsObj = text.reduce((acc, cur) => {
        if (cur) {
            acc.hasOwnProperty(cur) ? acc[cur] += 1 : acc[cur] = 1
        }
        return acc
    }, {})

    // convert object to arr
    // sort
    // return
    return wordsArray = Object.entries(wordsObj).sort((a, b) => b[1] - a[1])
}

function loadFile(file) {
    let reader = new FileReader()
    reader.addEventListener('load', e => {
        let result = e.target.result
        textarea.value = result
    })
    return reader.readAsText(file)
}

/*                                                      Filters                                                       */

function searchFilter(arr, value) {

    let filterArr = arr.filter((el) => {

        // get word
        // get length of value
        let word = el[0]
        let lenght = value.length
        let result = null

        for (let i = 0; i < lenght; i++) {
            // check first letter
            if (i === 0) {
                (word[i] === value[i]) ? result = true : result = false
            }
                // check next letter
            // check previous letter matches
            else (result === true && word[i] === value[i]) ? result = true : result = false

        }
        return result
    })

    return value.length < 1 ? wordsArray : filterArr
}

function letterFilter(arr, value) {
    // filter number of letters
    return arr.filter(el =>
        // return exactly or more than
        letterToggle.checked
            ? el[0].length === Number(value)
            : el[0].length > value
    )
}

function endingFilter(arr, value) {
    // filter ending letters of words
    return arr.filter(el => {
        let word = el[0]
        let index = word.length - value.length
        // return include ending or exclude ending
        return endingToggle.checked ? word.substr(index) !== value : word.substr(index) === value
    })
}

/*                                                      Scroll                                                        */

function scorll(el) {

    let top = document.querySelector(el).offsetTop

    window.scrollTo({
        top: top - 30,
        behavior: "smooth",
    })

}

function windowScroll(e) {

    let windowBottom = window.pageYOffset + window.innerHeight
    let x = window.innerHeight / 4

    if (windowBottom > display.offsetTop + x) {
        option.style.visibility = 'visible'
        option.style.opacity = '1'
    } else {
        option.style.visibility = 'hidden'
        option.style.opacity = '0'
    }
}


