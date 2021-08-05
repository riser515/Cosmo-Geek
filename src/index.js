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
    try{
        const r = await fetch(apiURL);
        resultData = await r.json();
        createDOM('results');
        console.log("Done");
    } catch(error){
        console.log("Error", e);
    }
}

getData();