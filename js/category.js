// console.log('categories added');


const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await res.json();
        displayCategories(data.categories);
    }
    catch (error) {
        console.log('ERROR:', error)
    }

}

const removeActiveStyle = () => {
    const button = document.getElementsByClassName("category-btn");
    
    for (btn of button){
        btn.classList.remove("bg-red-500", "text-white");
    }    
}

const loadCategorieVideos = async (id) => {
    // alert(id)
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
        const data = await res.json();

        // remove all active style 
        removeActiveStyle();

        // add active style 
        const activeBtn = document.getElementById(`btn-${id}`)
        console.log(activeBtn);
        activeBtn.classList.add("bg-red-500", "text-white");
        displayVideos(data.category);
    }
    catch (error) {
        console.log('ERROR:', error)
    }
}

const displayCategories = (categories) => {

    const categorieContainer = document.getElementById('categorie-container');

    categories.forEach(item => {
        // console.log(item);


        // create buttonn
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id="btn-${item.category_id}" onclick="loadCategorieVideos(${item.category_id})" 
            class="btn text-xl hover:bg-red-400 hover:text-white category-btn">${item.category}</button>
        
        `;


        // add button
        categorieContainer.appendChild(buttonContainer);

    });

}

loadCategories();