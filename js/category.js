// console.log('categories added');


const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await res.json();
        displayCategories(data.categories);
    }
    catch(error){
        console.log('ERROR:', error)
    }

}

const loadCategorieVideos = async(id) => {
    // alert(id)
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
        const data = await res.json();
        // console.log(data.category);
        displayVideos(data.category);
    }
    catch(error){
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
            <button onclick="loadCategorieVideos(${item.category_id})" class="btn text-xl">${item.category}</button>
        
        `;
        
    
        // add button
        categorieContainer.appendChild(buttonContainer);

    });

}

loadCategories();