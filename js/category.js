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


const displayCategories = (categories) => {
    
    const categorieContainer = document.getElementById('categorie-container');
    
    categories.forEach(item => {
        console.log(item);


        // create buttonn
        const button = document.createElement('button');
        button.classList.add('btn' , 'text-xl');
        button.innerText = item.category;
    
        // add button
        categorieContainer.appendChild(button);

    });

}

loadCategories();