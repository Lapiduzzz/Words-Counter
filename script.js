let textarea = document.querySelector('.textarea')
let button = document.querySelector('.button')
let display = document.querySelector('.display')



textarea.addEventListener('input', e => textarea.value = e.target.value)
button.addEventListener('click',(e)=> counterTriger(e))

function wordsCounter(text){

    text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()–«»?—]/g,"")
    text = text.replace(/\s+/g, ' ').trim().toLowerCase()
    text = text.split(' ')

    let wordsObj = text.reduce((acc,cur)=>{
        if (cur){
            acc.hasOwnProperty(cur) ? acc[cur] += 1 : acc[cur] = 1
        }
        return acc
    },{})
    return Object.entries(wordsObj).sort((a,b)=>b[1] - a[1])
}

function counterTriger(e){

    e.preventDefault()

    let wordsArray = wordsCounter(textarea.value)
    let count = 0

    display.innerHTML = ''
    wordsArray.forEach((el, i)=>{
        let word = el[0]
        let amount = el[1]
        word =  word[0].toUpperCase() + word.slice(1)

        display.insertAdjacentHTML('beforeend', `
         <div class="word">
            <p>${word}</p>
            <p> ${amount}</p>
        </div>`)

        count ++
    })
    display.insertAdjacentHTML('afterbegin', `
            <p class="s">Total words : ${count}</p>
        `)

    scorll('.display')

}

function scorll(el){

    let top = document.querySelector(el).offsetTop

    window.scrollTo({
        top: top -30,
        behavior: "smooth",
    })

}