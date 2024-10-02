// console.log('videos added');


const loadVideos = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
        const data = await res.json();
        displayVideos(data.videos);
    }
    catch (error) {
        console.log('ERROR:', error)
    }

}

const cardDemo = {
    "category_id": "1003",
    "video_id": "aaac",
    "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
    "title": "Laugh at My Pain",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
            "profile_name": "Kevin Hart",
            "verified": false
        }
    ],
    "others": {
        "views": "1.1K",
        "posted_date": "13885"
    },
    "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
}


const displayVideos = (videos) => {

    const videoContainer = document.getElementById('videos');

    videos.forEach(item => {
        console.log(item);


        // create video card
        const card = document.createElement('div');
        card.classList = "card card-compact ";
        card.innerHTML = `
        
        <figure class="rounded-xl">
                    <img class="w-full h-60" src=${item.thumbnail} alt="Shoes" />
                </figure>
                <div class="card-body">
                    <div class="flex gap-3">
                        <img class="w-10 h-10 rounded-full object-cover" src=${item.authors[0].profile_picture} alt="">
                        <div>
                            <h2 class="text-lg font-bold">${item.title}</h2>
                            <div class="flex items-center gap-2">
                                <p>${item.authors[0].profile_name}</p>
                                ${item.authors[0].verified === true ? `<img class="w-4 h-4" src="./assets/verified.png" alt=""></img>` : '' }
                            </div>
                            
                            <p>${item.others.views}</p>
                        </div>
                    </div>
                </div>
          
        `;


        // add button
        videoContainer.appendChild(card);

    });

}

loadVideos();