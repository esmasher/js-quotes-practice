main()
function main(){
    fetchQuotes()
    renderForm()
    // addLikes()
    deleteQuote()

}
// const footer = document.createElement('footer')
// footer.setAttribute('class', 'blockquote-footer')

function fetchQuotes(){
    fetch("http://localhost:3000/quotes?_embed=likes")
    .then(resp => resp.json())
    .then(quotes => quotes.forEach(function(quote){
        renderLikes(quote)})
   )}
 function renderLikes(quote){
     const ul = document.querySelector("#quote-list")
     const li = document.createElement("li")
     const blockquote = document.createElement('blockquote')
     const p = document.createElement('p')
     const footer = document.createElement('footer')
     const br = document.createElement('br')
     const likeButton = document.createElement('button')
     const span = document.createElement('span')
     const deleteButton = document.createElement('button')

     li.setAttribute('class', 'quote-card')
     p.setAttribute('class', 'mb-0')
     footer.setAttribute('class', 'blockquote-footer')
     likeButton.setAttribute('class', 'btn-success')
     deleteButton.setAttribute('class', 'btn-danger')
     li.dataset.id = quote.id
     p.innerText = quote.quote
     footer.innerHTML = quote.author
     likeButton.dataset.id = quote.id
     likeButton.innerHTML = `Likes:`
     deleteButton.innerHTML = "Delete"
     span.innerText = quote.likes.length

     ul.append(li)
     li.append(blockquote)
     likeButton.append(span)
     blockquote.append(p, footer, br, likeButton, deleteButton)
 }

function renderForm(){
    const form = document.querySelector('form')

    form.addEventListener('submit', function(event){
        event.preventDefault()

        if (event.target.elements[2].className === "btn btn-primary"){
            renderNewQuote(event)
            }
        })
    }


function renderNewQuote(event){

    const newQuote = {

        quote: event.target.elements.quote.value,
        author: event.target.elements.author.value
    }
    console.log(newQuote)

    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({newQuote})
    }

    fetch("http://localhost:3000/quotes", reqObj)
            .then(resp => resp.json())
            .then(quote => {
                event.target.reset
                const updatedLikes = {
                    ...quote,
                    likes:[]
                }
                renderQuote(updatedLikes)
            })
}

function renderQuote(newQ){
    console.log(newQ.newQuote.author)
    const ul = document.querySelector("#quote-list")
    const li = document.createElement("li")
    const blockquote = document.createElement('blockquote')
    const p = document.createElement('p')
    const footer = document.createElement('footer')
    const br = document.createElement('br')
    const likeButton = document.createElement('button')
    const span = document.createElement('span')
    const deleteButton = document.createElement('button')

    li.setAttribute('class', 'quote-card')
    p.setAttribute('class', 'mb-0')
    footer.setAttribute('class', 'blockquote-footer')
    likeButton.setAttribute('class', 'btn-success')
    deleteButton.setAttribute('class', 'btn-danger')

    li.dataset.id = newQ.id
    p.innerText = newQ.newQuote.quote
    footer.innerText = newQ.newQuote.author
    // likeButton.dataset.id = newQ.id
    likeButton.innerHTML = "Likes: "
    deleteButton.innerHTML = "Delete"
    span.innerText = newQ.likes.length


     ul.append(li)
     li.append(blockquote)
     likeButton.append(span)
     blockquote.append(p, footer, br, likeButton, deleteButton)

}

function deleteQuote(){
    //eventlistner for click
    //event target delete
    //fetch url with id
    //delete request
    const ul = document.querySelector("#quote-list")

    ul.addEventListener('click', function(event){
        event.preventDefault()
        console.log(event.target.parentNode.parentNode.dataset.id)
        if (event.target.className === "btn-danger"){

             const id = event.target.parentNode.parentNode.dataset.id
            const reqObj = {
                method: "DELETE"
            }

             fetch(`http://localhost:3000/quotes/${id}`, reqObj)
             .then(resp => resp.json())
             .then(quote => {
                event.target.parentNode.parentNode.remove()
             })
        }
    })
}















// function addLikes(){
//     const list = document.querySelector("#quote-list")

//     list.addEventListener('click', function(event){
//         event.preventDefault()
//         console.log("hello")

//         if (event.target.className === "btn-success"){
//             const id = event.target.dataset.id
//             console.log(event.target.dataset.id)
//             console.log(event.target.children)
//             const currentLikes= parseInt()
//             const reqObj = {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({})
//             }
//             fetch(`http://localhost:3000/likes/${id}`, reqObj)
//             // .then(resp => resp.json())
//             // .then(newLike => )

//         }
//     })
// }


// function deleteComment(e){
//     const commentId = parseInt(e.target.previousElementSibling.dataset.id)
//     const configObj = {
//         method: 'DELETE',
//         headers : {
//             "Content-Type" : "application/json",
//             "Accept" : "application/json"
//           }
//     }
//     fetch(`http://localhost:3000/comments/${commentId}`, configObj)
//     .then(response => response.json())
//     .then(response => {
//         e.target.parentNode.remove()
//     })
// }

// function createDeleteListener(){
//     const tBody = document.querySelector('tbody')
//     tBody.addEventListener('click', function(e){

//       if(e.target.className === 'delete-btn') {

//         const id = e.target.dataset.id

//         const reqObj = {
//           method: 'DELETE'
//         }

//         fetch(`http://localhost:3000/animals/${id}`, reqObj)
//         .then(resp => resp.json())
//         .then(data => {
//           e.target.parentNode.parentNode.remove()
//         })
//       }

//     })
//   }
