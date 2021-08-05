import './styles.css';

let resultData = [];
const post = document.querySelector('.post');
let date = new Date();
let endDate = new Date().toISOString().slice(0, 10);
let start = date.getDate() - 6;
let startDate = new Date(date.setDate(start)).toISOString().slice(0, 10);
let apiURL = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${startDate}&end_date=${endDate}`;
console.log(startDate);
console.log(endDate);

function createDOM(resultData){
    resultData.forEach(result => {
        // Card
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerText = result.date;
        post.append(card);

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

        link.append(img);
        card.append(link);
        post.append(card);
    });
}

async function getData(){
    try{
        const r = await fetch(apiURL);
        const resultData = await r.json();
        createDOM(resultData);
    } catch(error){
        console.log("Error", e);
    }
}

getData();