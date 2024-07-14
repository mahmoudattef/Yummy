/// <reference types="../@types/jquery" />


var loading = document.getElementById('loading')
loading.classList.remove('d-none')

$(function () {
    $('.sideBar').css('left', `-${$(".menu").innerWidth()}px`);
    $(document).on('click', '.open, .close', function () {
        if ($('.sideBar').css('left') == '0px') {
            $('.sideBar').animate({ left: `-${$(".menu").innerWidth()}px` }, 1000, function() {
                $('.open').removeClass('d-none');
                $('.close').addClass('d-none');
            });
        } else {
            $('.sideBar').animate({ left: `0px` }, 1000, function() {
                $('.open').addClass('d-none');
                $('.close').removeClass('d-none');
            });
        }
    });
});
async function getHomePage() {
    try {
        loading.classList.remove('d-none');
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
        var data = await response.json();
        console.log(data);
        displayData(data)
    } catch (error) {
        alert(error)
    } finally {

        loading.classList.add('d-none')
    }

}
getHomePage();
function displayData(data) {
    var cartona = ``
    for (let i = 0; i < data.meals.length; i++) {
        cartona += `
    <div class="col-md-3">
                <div class="card rounded-2 position-relative overflow-hidden" onclick="getDetails('${data.meals[i].idMeal}') ">
                    <img src="${data.meals[i].strMealThumb}" style="width: 100%;" alt="">
                    <div class="caption position-absolute bg-white opacity-50 d-flex align-items-center text-black ">
                        <h3>${data.meals[i].strMeal}</h3>
                    </div>
                </div>

            </div>
    `

    }
    document.getElementById('dis').innerHTML = cartona
}
////------------------------------------------------------------------details

async function getDetails(id) {
    try {
        loading.classList.remove('d-none');
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        var data = await response.json();
        displayDetails(data.meals[0])


    } catch (error) {
        alert(error)
    } finally {
        loading.classList.add('d-none')
    }
}

function displayDetails(data) {

    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }

    var cartona = ``


    cartona += `
        <div class="col-md-4  text-white  ">
                    <img src="${data.strMealThumb}" class="w-100 rounded-2 mb-3 pe-4" alt="">
                    <h3>${data.strMeal}</h3>
                </div>
                <div class="col-md-8  text-white ">
                    <h2>Instructions</h2>
                    <p>
                    ${data.strInstructions}
                    </p>
                    <h3><span>Area : </span> ${data.strArea}</h3>
                    <h3><span>Category : </span>${data.strCategory}</h3>
                    <h3><span>Recipes : </h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${ingredients}
                    </ul>
                    <h3><span>Tags : </h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${data.strTags}
                    </ul>
                    <a  href="${data.strSource}" class="btn btn-success">Source</a>
                    <a  href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>
        `
    document.getElementById('dis').innerHTML = cartona
}

//////---------------------------------------------------------------search
var btnSearch = document.getElementById('btnSearch')
btnSearch.addEventListener('click', function (event) {
    event.preventDefault();
    displaySearch()
})
async function getSearchName(name) {
    try {
        loading.classList.remove('d-none')
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        var data = await response.json();
        displayName(data)

    } catch (error) {

        console.log(error);
    } finally {
        loading.classList.add('d-none')
    }

}
async function getSeachByFirstLetter(letter) {
    try {
        loading.classList.remove('d-none');
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        var data = await response.json();
        displaySearchLetter(data)
    } catch (error) {

        console.log(error);
    } finally {
        loading.classList.add('d-none')
    }

}
function displaySearch() {
    var cartona = ``
    cartona += `
    <div class="col-md-6 ">
                    <input  class="form-control bg-transparent text-white" type="text" placeholder="Search By Name" oninput="getSearchName(this.value)">
                </div>
                <div class="col-md-6">
                    <input class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter" oninput="getSeachByFirstLetter(this.value)">
                </div>
    `


    document.getElementById('dis').innerHTML = cartona
}
function displayName(data) {
    var cartona = ``
    for (let i = 0; i < data.meals.length; i++) {

        cartona += `
     
     <div class="col-md-3">
                <div class="card rounded-2 position-relative overflow-hidden " onclick="getDetails('${data.meals[i].idMeal}')">
                    <img src="${data.meals[i].strMealThumb}" style="width: 100%;" alt="">
                    <div class="caption position-absolute bg-white opacity-50 d-flex align-items-center text-black ">
                        <h3>${data.meals[i].strMeal}</h3>
                    </div>
                </div>

            </div>
     `

    }

    document.getElementById('search').innerHTML = cartona
}
function displaySearchLetter(data) {

    var cartona = ``
    for (let i = 0; i < data.meals.length; i++) {

        cartona += `
     
     <div class="col-md-3">
                <div class="card rounded-2 position-relative overflow-hidden  " onclick="getDetails('${data.meals[i].idMeal}')">
                    <img src="${data.meals[i].strMealThumb}" style="width: 100%;" alt="">
                    <div class="caption position-absolute bg-white opacity-50 d-flex align-items-center text-black ">
                        <h3>${data.meals[i].strMeal}</h3>
                    </div>
                </div>

            </div>
     `

    }

    document.getElementById('search').innerHTML = cartona
}
///------------------------------------------------------------category page
var btnCategory = document.getElementById('btnCategory');

btnCategory.addEventListener('click', function (event) {
    event.preventDefault();
    getCategoryPage();
});

async function getCategoryPage() {
    try {
        loading.classList.remove('d-none');
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        var data = await response.json();
        displayDataCategory(data);
    } catch (error) {
        alert(error);
    } finally {
        loading.classList.add('d-none')
    }
}

function displayDataCategory(data) {
    var box = ``;
    for (let i = 0; i < data.categories.length; i++) {
        box += `
        <div class="col-md-3">
            <div class="card rounded-2 position-relative overflow-hidden bg-black" id="category" onclick="getMealCategory('${data.categories[i].strCategory}')">
                <img src="${data.categories[i].strCategoryThumb}" style="width: 100%;" alt="">
                <div class="caption position-absolute bg-white opacity-50 d-flex align-items-center text-black">
                    <h3>${data.categories[i].strCategory}</h3>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById('dis').innerHTML = box;
}
////----------------------------------------------------------------------MealCAtegory

async function getMealCategory(category) {
    try {
        loading.classList.remove('d-none');
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        var data = await response.json();
        console.log(data);
        displayMealCategory(data)
    } catch (error) {
        alert(error)
    } finally {
        loading.classList.add('d-none')
    }

}

function displayMealCategory(data) {
    var X = ``
    for (let i = 0; i < data.meals.length; i++) {
        X += `
    <div class="col-md-3">
                <div class="card rounded-2 position-relative overflow-hidden " onclick="getDetails('${data.meals[i].idMeal}')" >
                    <img src="${data.meals[i].strMealThumb}" style="width: 100%;" alt="">
                    <div class="caption position-absolute bg-white opacity-50 d-flex align-items-center text-black ">
                        <h3>${data.meals[i].strMeal}</h3>
                    </div>
                </div>

            </div>
    `

    }
    document.getElementById('dis').innerHTML = X
}
///----------------------------------------------------------------------- area page 
var AreaBtn = document.getElementById('AreaBtn');
AreaBtn.addEventListener('click', function (event) {
    event.preventDefault();
    getAreaPage()
})
async function getAreaPage() {
    try {
        loading.classList.remove('d-none');
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        var data = await response.json();
        displayDataArea(data)

    } catch (error) {
        alert(error)
        console.log(error);
    } finally {
        loading.classList.add('d-none')
    }
}
function displayDataArea(data) {
    var area = ``
    for (let i = 0; i < data.meals.length; i++) {
        area += `
       <div class="col-md-3">
                <div class="text-light rounded-2 position-relative overflow-hidden  " onclick="getMealArea('${data.meals[i].strArea}')">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${data.meals[i].strArea}</h3>
                   
                </div>

            </div>
       `

    }
    document.getElementById('dis').innerHTML = area
}
////-----------------------------------------------------------------------Area Meal
async function getMealArea(area) {
    try {
        loading.classList.remove('d-none');
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        var data = await response.json();
        console.log(data);
        displayMealArea(data)
    } catch (error) {
        alert(error)
        console.log(error);
    } finally {
        loading.classList.add('d-none')
    }

}

function displayMealArea(data) {
    var box = ``
    for (let i = 0; i < data.meals.length; i++) {
        box += `
    <div class="col-md-3">
                <div class="card rounded-2 position-relative overflow-hidden " onclick="getDetails('${data.meals[i].idMeal}')" >
                    <img src="${data.meals[i].strMealThumb}" style="width: 100%;" alt="">
                    <div class="caption position-absolute bg-white opacity-50 d-flex align-items-center text-black ">
                        <h3>${data.meals[i].strMeal}</h3>
                    </div>
                </div>

            </div>
    `

    }
    document.getElementById('dis').innerHTML = box
}


////-----------------------------------------------------------------------ingrdientsbtn
var ingredientsbtn = document.getElementById('ingredientsbtn');
ingredientsbtn.addEventListener('click', function (event) {
    event.preventDefault();
    getIngredientsPage();
});

async function getIngredientsPage() {
    try {
        loading.classList.remove('d-none');
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=meal`);
        var data = await response.json();
        displayDataIngredients(data);
    } catch (error) {
        console.log(error);
    } finally {
        loading.classList.add('d-none')
    }
}

function displayDataIngredients(data) {
    var ingredients = ``;
    for (let i = 0; i < data.meals.length; i++) {
        let description = data.meals[i].strDescription ? data.meals[i].strDescription.split(" ").slice(0, 20).join(" ") : 'No description available';
        ingredients += `
        <div class="col-md-3">
            <div class="text-light rounded-2 position-relative overflow-hidden" onclick="getMealingredients('${data.meals[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${data.meals[i].strIngredient}</h3>
                <p>${description}</p>
            </div>
        </div>
        `;
    }
    document.getElementById('dis').innerHTML = ingredients;
}
////----------------------------------------------------------------------Mealingredients

async function getMealingredients(ingredients) {
    try {
        loading.classList.remove('d-none');
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
        var data = await response.json();
        console.log(data);
        displayMealingredients(data)
    } catch (error) {
        alert(error)
    } finally {
        loading.classList.add('d-none')
    }

}

function displayMealingredients(data) {
    var X = ``
    for (let i = 0; i < data.meals.length; i++) {
        X += `
    <div class="col-md-3">
                <div class="card rounded-2 position-relative overflow-hidden " onclick="getDetails('${data.meals[i].idMeal}')">
                    <img src="${data.meals[i].strMealThumb}" style="width:100%;" alt="">
                    <div class="caption position-absolute bg-white opacity-50 d-flex align-items-center text-black ">
                        <h3>${data.meals[i].strMeal}</h3>
                    </div>
                </div>

            </div>
    `

    }
    document.getElementById('dis').innerHTML = X
}

///-------------------------------------------------------------Countant US

document.getElementById("countact").addEventListener("click", function (event) {
    event.preventDefault();
    displayContact();

})

function displayContact() {
    var displayCon = document.getElementById('dis')
    displayCon.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
<div class="container w-75 text-center">
    <div class="row g-4">
        <div class="col-md-6">
            <input id="nameInput" onkeyup="inputsValidation('nameInput')" type="text" class="text-white bg-transparent form-control" placeholder="Enter Your Name">
            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                Special characters and numbers not allowed
            </div>
        </div>
        <div class="col-md-6">
            <input id="emailInput" onkeyup="inputsValidation('emailInput')" type="email" class="bg-transparent text-white form-control " placeholder="Enter Your Email">
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                Email not valid *exemple@yyy.zzz
            </div>
        </div>
        <div class="col-md-6">
            <input id="phoneInput" onkeyup="inputsValidation('phoneInput')" type="text" class="bg-transparent text-white form-control " placeholder="Enter Your Phone">
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid Phone Number
            </div>
        </div>
        <div class="col-md-6">
            <input id="ageInput" onkeyup="inputsValidation('ageInput')" type="number" class="bg-transparent text-white form-control " placeholder="Enter Your Age">
            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid age
            </div>
        </div>
        <div class="col-md-6">
            <input  id="passwordInput" onkeyup="inputsValidation('passwordInput')" type="password" class="bg-transparent text-white form-control " placeholder="Enter Your Password">
            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid password Minimum eight characters, at least one letter and one number:
            </div>
        </div>
        <div class="col-md-6">
            <input  id="repasswordInput" onkeyup="inputsValidation('repasswordInput')" type="password" class="bg-transparent text-white form-control " placeholder="Repassword">
            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid repassword 
            </div>
        </div>
    </div>
    <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3" onclick="handleSubmit(event)">Submit</button>
</div>
</div>`;
}



let isNameValid = false;
let isEmailValid = false;
let isPhoneValid = false;
let isAgeValid = false;
let isPasswordValid = false;
let isRepasswordValid = false;


function inputsValidation(inputId) {
    const nameInput = document.getElementById('nameInput').value.trim();
    const emailInput = document.getElementById('emailInput').value.trim();
    const phoneInput = document.getElementById('phoneInput').value.trim();
    const ageInput = document.getElementById('ageInput').value.trim();
    const passwordInput = document.getElementById('passwordInput').value.trim();
    const repasswordInput = document.getElementById('repasswordInput').value.trim();

    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,14}$/;
    const ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][0-9]|200)$/;
    const passwordRegex = /^(?=.[A-Za-z])[A-Za-z\d@$!%?&]{8,}$/;

    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => alert.classList.add('d-none'));


    switch (inputId) {
        case 'nameInput':
            if (!nameRegex.test(nameInput)) {
                document.getElementById('nameAlert').classList.remove('d-none');
            }
            break;
        case 'emailInput':
            if (!emailRegex.test(emailInput)) {
                document.getElementById('emailAlert').classList.remove('d-none');
            }
            break;
        case 'phoneInput':
            if (!phoneRegex.test(phoneInput)) {
                document.getElementById('phoneAlert').classList.remove('d-none');
            }
            break;
        case 'ageInput':
            if (!ageRegex.test(ageInput)) {
                document.getElementById('ageAlert').classList.remove('d-none');
            }
            break;
        case 'passwordInput':
            if (!passwordRegex.test(passwordInput)) {
                document.getElementById('passwordAlert').classList.remove('d-none');
            }
            break;
        case 'repasswordInput':
            if (passwordInput !== repasswordInput) {
                document.getElementById('repasswordAlert').classList.remove('d-none');
            }
            break;
        default:
            break;
    }

    isNameValid = nameRegex.test(nameInput);
    isEmailValid = emailRegex.test(emailInput);
    isPhoneValid = phoneRegex.test(phoneInput);
    isAgeValid = ageRegex.test(ageInput);
    isPasswordValid = passwordRegex.test(passwordInput);
    isRepasswordValid = passwordInput === repasswordInput;


    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = !(isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid);
}


function handleSubmit(event) {
    event.preventDefault();

    if (isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid) {


        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => alert.classList.add('d-none'));

        document.getElementById('submitBtn').disabled = true;
    }
}