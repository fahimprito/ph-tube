// console.log('videos added');
function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let remainingTime = time % 3600;
    const min = parseInt(remainingTime / 60);
    return `${hour}hrs ${min}min ago`;
}


const loadVideos = async (searchText="") => {
    try {
        const res = await fetch(
            `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
        );
        const data = await res.json();
        displayVideos(data.videos);
    }
    catch (error) {
        console.log('ERROR:', error)
    }

}

const loadDetails = async (videoId) => {
    console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video);

}

const displayDetails = (video) => {
    console.log(video);
    const detailContainer = document.getElementById("modal-content");

    detailContainer.innerHTML = `
     <img src=${video.thumbnail} />
     <p>${video.description}</p>
    `;

    // show modal 
    document.getElementById("customModal").showModal();
};

// const cardDemo = {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//             "profile_name": "Kevin Hart",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// }


const displayVideos = (videos) => {

    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `   
        <div class="min-h-96 flex justify-center items-center">
            <div class="flex flex-col justify-center items-center gap-6">
                <img src="./assets/Icon.png" alt="">
                <p class="text-4xl text-center font-bold">Oops!! Sorry, There is no content here</p>
            </div>
        </div>         
        
        
        `;
        return;
    }
    else {
        videoContainer.classList.add("grid");
    }

    videos.forEach(item => {
        // console.log(item);


        // create video card
        const card = document.createElement('div');
        card.classList = "card card-compact ";
        card.innerHTML = `
        
            <figure class="rounded-xl relative">
                    <img class="w-full h-60" src=${item.thumbnail} alt="Shoes" />
                    ${item.others.posted_date?.length == 0 ? "" : `<span class="absolute bg-black text-white right-2 bottom-2 p-1 rounded-md text-xs"> ${getTimeString(item.others.posted_date)}</span>`
            }                    
            </figure>

                <div class="card-body">
                    <div class="flex justify-between">
                        <div class="flex gap-3>
                            <img class="w-10 h-10 rounded-full object-cover" src=${item.authors[0].profile_picture} alt="">
                            <div>
                                <h2 class="text-lg font-bold">${item.title}</h2>
                                <div class="flex items-center gap-2">
                                    <p>${item.authors[0].profile_name}</p>
                                    ${item.authors[0].verified === true ? `<img class="w-4 h-4" src="./assets/verified.png" alt=""></img>` : ''}
                                </div>
                                
                                <p>${item.others.views}</p>
                            </div>
                        </div>
                        
                        
                        <div class = "w-5">
                            <a class="tooltip hover:cursor-pointer" data-tip="Details">
                            <img onclick="loadDetails('${item.video_id}')"  src="./assets/details.png" alt=""></a>
                        </div>
                    </div>
                </div>
          
        `;


        // add button
        videoContainer.appendChild(card);

    });

}

document.getElementById("search-input").addEventListener("keyup", (event) => {
    loadVideos(event.target.value);
    // console.log(event.target.value);
    
});

loadVideos();