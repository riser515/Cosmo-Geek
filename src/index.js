import './styles.css';
import img from '../images/cosmo.png';
import img1 from '../astronaut.svg';

let resultData = [];
let favPosts = [];
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');
const homebtn = document.querySelector('.homebtn');
const favbtn = document.querySelector('.favbtn');
const post = document.querySelector('.post');
const homenav = document.getElementById('homenav');
const homefav = document.getElementById('homefav');
const favnav = document.getElementById('favnav');
let date = new Date();
let endDate = new Date().toISOString().slice(0, 10);
let start = date.getDate() - 6;
let startDate = new Date(date.setDate(start)).toISOString().slice(0, 10);
let apiURL = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${startDate}&end_date=${endDate}`;
console.log(startDate);
console.log(endDate);

function saveFav(resultURL){
    resultData.forEach(result => {
        if(result.url.includes(resultURL) && !favPosts[resultURL]){
            favPosts[resultURL] = result;
            localStorage.setItem('favpost', JSON.stringify(favPosts));
            saveConfirmed.hidden = false;
            setTimeout(() => {
                saveConfirmed.hidden = true;
            }, 3000);
        }
    })
}

function removeFav(resultURL){
    if(favPosts[resultURL]){
        delete favPosts[resultURL];
        localStorage.setItem('favpost', JSON.stringify(favPosts));
        renderData('fav');
    }
}

function createDOM(data){
    let renderArray = data === 'results' ? resultData : Object.values(favPosts);
    renderArray.forEach(result => {
        // Card
        const card = document.createElement('div');
        card.classList.add('card');

        // Line
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';

        // Image
        const img = document.createElement('img');
        img.src = result.url;
        img.alt = 'Cosmo Geek Image';
        img.loading = 'lazy';
        img.classList.add('card--image');

        // Card Body
        const cbody = document.createElement('div');
        cbody.classList.add('card--body');

        // Card Title
        const title = document.createElement('h5');
        title.classList.add('card--title');
        title.innerText = result.title;

        // Save Button
        const savebtn = document.createElement('p');
        savebtn.classList.add('clickable');
        savebtn.style.color = 'dodgerblue';
        if(data === 'results'){
            savebtn.textContent = 'Add to Favorites';
            savebtn.addEventListener('click', function(){
                saveFav(`${result.url}`);
            });
        }
        else{
            savebtn.textContent = 'Remove from Favorites';
            savebtn.addEventListener('click', function(){
                removeFav(`${result.url}`);
            });
        }

        // Card Text
        const cText = document.createElement('p');
        cText.innerText = result.explanation;

        // Card Footer
        const cFooter = document.createElement('small');

        // Card Date
        const cDate = document.createElement('strong');
        cDate.innerText = result.date;

        // Author
        let author = result.copyright === undefined ? '' : result.copyright;
        const cAuthor = document.createElement('span');
        cAuthor.innerText = author;

        cFooter.append(cDate, cAuthor);
        cbody.append(title, savebtn, cText, cFooter);
        link.append(img);
        card.append(link, cbody);
        post.append(card);
    });
}

async function getData(){
    loader.classList.remove('hidden');
    try{
        const r = await fetch(apiURL);
        resultData = await r.json();
        renderData('results');
    } catch(error){
        console.log("Error", e);
    }
}

function changeNav(data){
    loader.classList.add('hidden');
    if(data === 'results'){
        homenav.style.display = '';
        favnav.style.display = 'none';
    }
    else{
        homenav.style.display = 'none';
        favnav.style.display = '';
    }
}

function renderData(data){
    if(localStorage.getItem('favpost')){
        favPosts = JSON.parse(localStorage.getItem('favpost'));
    }
    post.innerHTML = '';
    createDOM(data);
    changeNav(data);
}

function init(){
    getData();
    homebtn.addEventListener('click', getData);
    homefav.addEventListener('click', getData);
    favbtn.addEventListener('click', function(){
        renderData('fav');
    });
}

init();