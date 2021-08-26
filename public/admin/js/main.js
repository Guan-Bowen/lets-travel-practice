let addPostBtn = document.querySelector('.create-post-btn');
let logOutBtn = document.querySelector('.log-out-btn');

document.addEventListener('DOMContentLoaded', async function () {
    addPosts();
    addCallbackRequests();
    addEmails();
})

addPostBtn.addEventListener('click', function () {
    let articlesTab = document.querySelector('#v-pills-articles');
    articlesTab.classList.remove('show');
    articlesTab.classList.remove('active');

    let createPostTab = document.querySelector('#v-pills-create-post');
    createPostTab.classList.add('show');
    createPostTab.classList.add('active');
})

async function addPosts(){
    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    articles.innerHTML = '';
    let i = 1;
    posts.forEach((post) => {
        let postHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden", value="${post.id}">
            <div class="name w30">${post.title}</div>
            <div class="date w30">${post.date}</div>
            <div class="country w20">${post.country}</div>
            <div class="edit w10"><button class="btn btn-link btn-edit">Edit</button></div>
            <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
        </article>`;
        articles.insertAdjacentHTML('beforeend', postHTML);
    })
}

async function addCallbackRequests(){
    let requests = await getCallbackRequests();
    let requestsBlock = document.querySelector('#v-pills-callback');
    requestsBlock.innerHTML = '';
    let i = 1;
    requests.forEach((request) => {
        let requestHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden", value="${request.id}">
            <div class="name w60">${request.phoneNumber}</div>
            <div class="date w30">${request.date}</div>
            <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
        </article>`;
        requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
    })
}

async function addEmails(){
    let emails = await getEmails();
    let emailsBlock = document.querySelector('#v-pills-mails');
    emailsBlock.innerHTML = '';
    let i = 1;
    emails.forEach((e) => {
        let emailHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden", value="${e.id}">
            <div class="name w20">${e.name}</div>
            <div class="email w40">${e.email}</div>
            <div class="date w30">${e.date}</div>
            <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
            <div class="text w100">Content: ${e.text}</div>
        </article>`;
        emailsBlock.insertAdjacentHTML('beforeend', emailHTML);
    })
}

logOutBtn.addEventListener('click', function(){
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = '/';
})