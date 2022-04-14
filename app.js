const inp = document.querySelector(".inp");
const form = document.querySelector(".search");
const resultArea = document.querySelector(".results");
const mealIntro = document.querySelector(".meal_intro");

async function getMeal() {

    let val = inp.value;
    let API_BASE = `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`;
    // fetch the data from api

    try {
        let res = await fetch(API_BASE);
        let data = await res.json();
        console.log(data);
        let mealList = data.meals;
        let mealNewList = [];
        for (let i = 0; i < mealList.length; i++) {
            let mealDir = {
                title: "",
                tag: "",
                country: "",
                id: 0
            }
            mealDir.title = mealList[i].strMeal;
            mealDir.tag = mealList[i].strTags ? mealList[i].strTags : mealList[i].strCategory;
            mealDir.country = mealList[i].strArea;
            mealDir.id = mealList[i].idMeal;
            mealNewList.push(mealDir);
        }
        return mealNewList;
    } catch (err) {
        resultArea.innerHTML = "!!! NO MEAL FOUND !!!"
    }
}

form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    getMeal().then((res) => {

        if (res) {
            resultArea.innerHTML = "";

            inp.style.border = "2px solid lightgreen";
            setTimeout(() => {
                inp.style.border = "2px solid gray";
            },4000)

            for (let i = 0; i < res.length; i++) {
                addMeal(res[i].title, res[i].tag, res[i].country, res[i].id);
            }

            for (let i = 0; i < resultArea.children.length; i++) {
                let btns = resultArea.children[i].lastChild;
                btns.addEventListener("click", () => {
                    mealIntro.style.opacity = "1";
                    mealIntro.style.left = "25%";
                    addIntro(btns.id);
                })
            }
        } else {
            inp.style.border = "2px solid crimson";
            setTimeout(() => {
                inp.style.border = "2px solid gray";
            },4000)
        }
    })
});


function addMeal(title, tag, country, id) {
    let div = document.createElement("div");
    div.classList.add("res");

    let h = document.createElement("h3");
    h.classList.add("meal_title");
    h.textContent = title;

    let p1 = document.createElement("p");
    p1.classList.add("meal_tags");
    p1.textContent = tag;

    let p2 = document.createElement("p");
    p2.classList.add("meal_origin");
    p2.innerHTML = country;

    let button = document.createElement("button");
    button.classList.add("meal_learn_more");
    button.id = id;
    button.textContent = "Learn More";

    div.appendChild(h);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(button);

    resultArea.appendChild(div);
}




function addIntro(id) {
    let api_base = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    let source = "";
    let heading = "";
    let tag = "";
    let origin = "";
    let category = "";
    let ingre = [];
    let link = "";
    let instruction = "";

    //get the fetch data
    fetch(api_base).then((res) => {
        return res.json();
    }).then((data) => {
        let dataList = data.meals;

        source = dataList[0].strYoutube;
        heading = dataList[0].strMeal;
        tag = dataList[0].strTags;
        origin = dataList[0].strArea;
        category = dataList[0].strCategory;

        ingre.push(dataList[0].strIngredient1);
        ingre.push(dataList[0].strIngredient2);
        ingre.push(dataList[0].strIngredient3);
        ingre.push(dataList[0].strIngredient4);
        ingre.push(dataList[0].strIngredient5);
        ingre.push(dataList[0].strIngredient6);
        ingre.push(dataList[0].strIngredient7);
        ingre.push(dataList[0].strIngredient8);
        ingre.push(dataList[0].strIngredient9);
        ingre.push(dataList[0].strIngredient10);
        ingre.push(dataList[0].strIngredient11);
        ingre.push(dataList[0].strIngredient12);
        ingre.push(dataList[0].strIngredient13);
        ingre.push(dataList[0].strIngredient14);
        ingre.push(dataList[0].strIngredient15);
        ingre.push(dataList[0].strIngredient16);
        ingre.push(dataList[0].strIngredient17);
        ingre.push(dataList[0].strIngredient18);
        ingre.push(dataList[0].strIngredient19);
        ingre.push(dataList[0].strIngredient20);

        link = dataList[0].strSource;
        instruction = dataList[0].strInstructions;

        mealIntro.innerHTML = `
        <h4 class="close"><i class="fa fa-times"></i></h4>
        <iframe width="560" height="315" src=${source} title="YouTube video player"
            frameborder="0"
            target="_blank"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        <p class="yt">YOUTUBE :<a href="${source} target="_blank">${source}</a></p>
        <h2 class="mealHead">${heading}</h2>
        <p class="mealTag">TAGS: <span class="tag">${tag}</span></p>
        <p class="mealOrigin">ORIGIN: <span class="origin">${origin}</span></p>
        <p class="mealCategory">CATEGORY: <span class="category">${category}</span></p>
        <p class="mealIngre">INGREDIENTS: <span class="ingre">${ingre.join(",")}</span></p>
        <p class="link_source">SOURCE: <a href=${link} target="_blank">BBCFOOD</a></p>
        <p class="mealHow">INSTRUCTIONS TO PREPARE THIS MEAL</p>
        <p class="mealHowResult">${instruction}</p>
    `;

        const closeBtn = document.querySelector(".close");

        closeBtn.addEventListener("click", () => {
            mealIntro.style.left = "-50%";
            mealIntro.style.opacity = "0";
        });

    })
}


// RECOMMENDATION LOGIC SIDE