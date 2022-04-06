let textarea = document.querySelector('.textarea')
let calculate = document.querySelector('.calculate')
let reset = document.querySelector('.reset')
let load = document.querySelector('.load')
let display = document.querySelector('.display')
let search = document.querySelector('.search')

textarea.addEventListener('load', e => textarea.value = e.target.value)
load.addEventListener('change', e => loadFile(e.target.files[0]))
calculate.addEventListener('click', e => counterTriger(e, 'calc'))
reset.addEventListener('click', e => {
    e.preventDefault();
    textarea.value = ''
    counterTriger(e, 'calc')
})
search.addEventListener('input', e => counterTriger(e, 'filt'))

let totalWords = 0
let totalUniqueWords = 0
let wordsArray = []

function counterTriger(e, trigger) {

    e.preventDefault()

    totalWords = 0
    totalUniqueWords = 0
    let words = []

    switch (trigger) {
        case
        'calc' :
            words = wordsCounter(textarea.value)
            break
        case
        'filt':
            words = searchFilter(e.target.value)
            break
    }

    display.innerHTML = ''
    words.forEach((el, i) => {
        let word = el[0]
        let amount = el[1]
        word = word[0].toUpperCase() + word.slice(1)

        display.insertAdjacentHTML('beforeend', `
         <div class="word">
            <p>${word}</p>
            <p> ${amount}</p>
        </div>`)

        totalUniqueWords++
        totalWords = totalWords + amount
    })
    display.insertAdjacentHTML('afterbegin', `
            <p class="total">Total words : ${totalWords}</p>
            <p class="total">Total unique words : ${totalUniqueWords}</p>
        `)

    scorll('.display')

}

function wordsCounter(text) {

    text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()–«»?—]/g, "")
    text = text.replace(/\s+/g, ' ').trim().toLowerCase()
    text = text.split(' ')

    let wordsObj = text.reduce((acc, cur) => {
        if (cur) {
            acc.hasOwnProperty(cur) ? acc[cur] += 1 : acc[cur] = 1
        }
        return acc
    }, {})
    return wordsArray = Object.entries(wordsObj).sort((a, b) => b[1] - a[1])
}

function searchFilter(value) {
    let filterArr = wordsArray.filter((el) => {
        let word = el[0]
        let lenght = value.length
        let result = null

        for (let i = 0; i < lenght; i++) {
            if (i === 0) {
                (word[i] === value[i]) ? result = true : result = false
            } else (result === true && word[i] === value[i]) ? result = true : result = false

        }
        return result
    })


    return value.length < 1 ? wordsArray : filterArr

}

function loadFile(file) {
    let reader = new FileReader()
    reader.addEventListener('load', e => {
        let result = e.target.result
        textarea.value = result
    })
    return reader.readAsText(file)
}

function scorll(el) {

    let top = document.querySelector(el).offsetTop

    window.scrollTo({
        top: top - 30,
        behavior: "smooth",
    })

}


