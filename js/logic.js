$(document).ready(function () {
    $("#searchContainer").html("");
    $("#data").html('');
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
        .then(response => response.json())
        .then(data => {

            data.meals.forEach(element => {
                $("#data").append(`
                <div class="col-3 ">
                    <div  onclick="getMeal(${element.idMeal})" class="inner item-card position-relative overflow-hidden">
                        <img src="${element.strMealThumb}" class="w-100" alt="">
                        <div class="img-outlier ">
                            <h2>${element.strMeal}</h2>

                        </div>
                    </div>
                </div>
                `);
            });


        }
        ).catch(error => console.log(error))
});



$(".open-close").click(function (e) {
    if ($("#toggle").hasClass("fa-x")) {
        $("#sideBar").animate({
            right: '100%'
        }, 500);
        $("#control").animate({
            left: '0'
        }, 500);
        $("#toggle").removeClass("fa-x");
        $("#toggle").addClass("fa-align-justify");
    }
    else if ($("#toggle").hasClass("fa-align-justify")) {
        $("#sideBar").animate({

            right: '20%'
        }, 500);
        $("#control").animate({
            left: '80%'
        }, 500);
        $("#toggle").removeClass("fa-align-justify");
        $("#toggle").addClass("fa-x");
    }
});



function getMeal(mealID) {
    $("#searchContainer").html("");
    $("#data").html('');
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(response => response.json())
        .then(data => {

            data.meals.forEach(element => {


                if (element.strTags) {
                    tags = element.strTags.split(',')
                }
                else {
                    tags = []
                }

                const ingrediants = [];
                for (let i = 1; i <= 20; i++) {
                    const ingrediant = element[`strIngredient${i}`];
                    if (ingrediant) {
                        ingrediants.push(ingrediant)
                    }
                }

                $("#data").append(`
                <div class="col-4 text-white">
                    <div class="inner">
                        <img src="${element.strMealThumb}" class="w-100" alt="">
                        <h2>${element.strMeal}</h2>
                    </div>
                </div>
                <div class="col-8  text-white">
                    <div class="inner">
                        <h2>Instructions</h2>
                        <p>${element.strInstructions}</p>
                        <h3 class="fw-bold">Area : <span>${element.strArea}</span></h3>
                        <h3 class="fw-bold">Category : <span>${element.strCategory}</span></h3>
                        <h3>Recipes :</h3>
                        <ul class="list-unstyled d-flex flex-wrap  ">
                            
                            ${ingrediants.map(ingrediant => `<li class="p-1 m-2 alert alert-info ">${ingrediant}</li>`).join('')}
                        </ul>
                        <h3>Tags :</h3>
                        <ul class="list-unstyled d-flex g-3">
                            
                            ${tags.map(tag => `<li class="alert alert-danger m-2 p-1">${tag.trim()}</li>`).join('')}
                        </ul>
                        <div class="links">
                                <a class ="btn btn-success" href="">Surce</a>
                                <a class ="btn btn-danger   " href="${element.strYoutube}">Youtube</a>
                        </div>
                    </div>
                </div>

                `);
            });


        }
        ).catch(error => console.log(error))

}


function getCategories() {
    $("#searchContainer").html("");
    $("#data").html('');

    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(response => response.json())
        .then(data => {

            data.categories.forEach(element => {
                $("#data").append(`
                <div class="col-3 ">
                    <div onclick="filterCat('${element.strCategory}')" class="inner item-card position-relative overflow-hidden">
                        <img src="${element.strCategoryThumb}" class="w-100" alt="">
                        <div class="img-outlier d-flex flex-column text-center">
                            <h2>${element.strCategory}</h2>
                            <p>${element.strCategoryDescription}</p>
                        </div>
                    </div>
                </div>
                `);
            });


        }
        ).catch(error => console.log(error))
}



function getIngrediants() {
    $("#searchContainer").html("");
    $("#data").html('');

    fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
        .then(response => response.json())
        .then(data => {

            data.meals.forEach(element => {

                const desc = element.strDescription.split(' ').slice(0, 20).join(' ')
                if (desc == null) {
                    desc = ''
                }

                $("#data").append(`
                    <div class="col-3">
                        <div onclick="filterIng('${element.strIngredient}')" class="inner text-white text-center">
                            <i class=" fa-solid fa-drumstick-bite fa-4x "></i>
                            <h3 class="my-2 ">${element.strIngredient}</h3>
                            <p>${desc}</p>
                        </div>
                    </div>
                    `);


            });


        }
        ).catch(error => console.log(error))
}


function filterIng(name) {
    $("#searchContainer").html("");
    $("#data").html('');

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
        .then(response => response.json())
        .then(data => {

            data.meals.forEach(element => {
                $("#data").append(`
                <div class="col-3 ">
                    <div  onclick="getMeal(${element.idMeal})" class="inner item-card position-relative overflow-hidden">
                        <img src="${element.strMealThumb}" class="w-100" alt="">
                        <div class="img-outlier ">
                            <h2>${element.strMeal}</h2>
                            
                        </div>
                    </div>
                </div>
                `);
            });


        }
        ).catch(error => console.log(error))
}

function filterCat(name) {
    $("#searchContainer").html("");
    $("#data").html('');

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
        .then(response => response.json())
        .then(data => {


            data.meals.forEach(element => {
                $("#data").append(`
                <div class="col-3 ">
                    <div  onclick="getMeal(${element.idMeal})" class="inner item-card position-relative overflow-hidden">
                        <img src="${element.strMealThumb}" class="w-100" alt="">
                        <div class="img-outlier ">
                            <h2>${element.strMeal}</h2>
                            
                        </div>
                    </div>
                </div>
                `);
            });
        }
        ).catch(error => console.log(error))
}

function getAreas() {
    $("#searchContainer").html("");
    $("#data").html('');

    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        .then(response => response.json())
        .then(data => {


            data.meals.forEach(element => {
                $("#data").append(`
                <div class="col-3">
                    <div onclick="filterArea('${element.strArea}')" class="inner text-white text-center">
                        <i class="fa-solid fa-house-laptop fa-4x "></i>
                        <h3 class="my-2 ">${element.strArea}</h3>
                    </div>
                </div>
                `);
            });
        }
        ).catch(error => console.log(error))
}


function filterArea(area) {
    $("#searchContainer").html("");


    $("#data").html('');

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        .then(response => response.json())
        .then(data => {


            data.meals.forEach(element => {
                $("#data").append(`
                <div class="col-3 ">
                    <div  onclick="getMeal(${element.idMeal})" class="inner item-card position-relative overflow-hidden">
                        <img src="${element.strMealThumb}" class="w-100" alt="">
                        <div class="img-outlier ">
                            <h2>${element.strMeal}</h2>
                            
                        </div>
                    </div>
                </div>
                `);
            });
        }
        ).catch(error => console.log(error))
}

function displaySearch() {
    $("#searchContainer").html(`
        <div class="col-6">
                    <div class="inner ">
                        <input type="text" onkeyup="searchName(this.value)" class="w-100 p-1   bg-transparent text-white " placeholder="Search By Name">
                    </div>
                </div>
                <div class="col-6">
                    <div class="inner ">
                        <input type="text" onkeyup="searchLetter(this.value)" class="w-100 p-1   bg-transparent text-white " placeholder="Search By First Letter">
                    </div>
                </div>
        `);

    $("#data").html('');
}


function searchName(name) {
    $("#data").html('');

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(response => response.json())
        .then(data => {



            data.meals.forEach(element => {
                $("#data").append(`
                <div class="col-3 ">
                    <div  onclick="getMeal(${element.idMeal})" class="inner item-card position-relative overflow-hidden">
                        <img src="${element.strMealThumb}" class="w-100" alt="">
                        <div class="img-outlier ">
                            <h2>${element.strMeal}</h2>
                            
                        </div>
                    </div>
                </div>
                `);
            });
        }
        ).catch(error => console.log(error))
}

function searchLetter(letter) {
    $("#data").html('');

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(response => response.json())
        .then(data => {



            data.meals.forEach(element => {
                $("#data").append(`
                <div class="col-3 ">
                    <div  onclick="getMeal(${element.idMeal})" class="inner item-card position-relative overflow-hidden">
                        <img src="${element.strMealThumb}" class="w-100" alt="">
                        <div class="img-outlier ">
                            <h2>${element.strMeal}</h2>
                            
                        </div>
                    </div>
                </div>
                `);
            });
        }
        ).catch(error => console.log(error))
}

function displayContact() {
    $("#data").html('');
    $("#data").append(`
        
        <div class="contact  vh-100 d-flex align-items-center ">
            <div class="container  w-75 m-auto ">
                <div class="row g-3 justify-content-center">
                    <div class="col-6">
                        <div class="inner">
                            <input onkeyup="validateName(this.value)" id="name" type="text" class="w-100 p-1 rounded-3 form-control"
                            placeholder="Enter Your Name ">
                            <div id="nonValidName" class="w-100 alert alert-danger mt-2 d-none text-center text-danger ">
                            Special characters and numbers not allowed
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="inner" >
                            <input onkeyup="validateEmail(this.value)" type="email" class="w-100 p-1 rounded-3 form-control"
                                placeholder="Enter Your Email ">
                            
                            <div id="nonValidEmail" class="w-100 alert alert-danger mt-2 d-none text-center text-danger ">
                            Email not valid *exemple@yyy.zzz
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="inner">
                            <input onkeyup="validatePhone(this.value)" id="phone" type="text" class="w-100 p-1 rounded-3 form-control"
                                placeholder="Enter Your Phone ">
                            <div id="nonValidPhone" class="w-100 alert alert-danger mt-2 d-none text-center text-danger ">
                            Enter valid Phone Number start with 01
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="inner">
                            <input onkeyup="validateAge(this.value)" id="age" type="number" class="w-100 p-1 rounded-3 form-control"
                                placeholder="Enter Your Age ">
                            <div id="nonValidAge" class="w-100 alert alert-danger mt-2 d-none text-center text-danger ">
                            Enter valid age
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="inner">
                            <input onkeyup="validatePassword(this.value)" id="password" type="password" class="w-100 p-1 rounded-3 form-control"
                                placeholder="Enter Your Password ">
                            <div id="nonValidPassword" class="w-100 alert alert-danger mt-2 d-none text-center text-danger ">
                            Enter valid password *Minimum eight characters, at least one letter and one number:*
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="inner">
                            <input id="repassword" onkeyup="validateRepassword(this.value)" type="password" class="w-100 p-1 rounded-3 form-control"
                                placeholder="Repassword ">
                            <div id="nonValidRePassword" class="w-100 alert alert-danger mt-2 d-none text-center text-danger ">
                            Enter valid Repassword 
                            </div>
                        </div>
                    </div>
                    <button class="border-danger btn-outline-danger bg-black text-danger w-auto px-2 mt-3">Submit</button>
                </div>
            </div>
        </div>

        `)
}


function validateName(value) {
    const pattern = /^[a-zA-Z]+$/;
    
    if (pattern.test(value) === false) {
        $("#nonValidName").removeClass('d-none');
        $("#nonValidName").addClass('d-block');
    }else{
        $("#nonValidName").removeClass('d-block');
        $("#nonValidName").addClass('d-none');
    }
    
}

function validateEmail(value) {
    const pattern = /^[a-zA-Z._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (pattern.test(value) === false) {
        $("#nonValidEmail").removeClass('d-none');
        $("#nonValidEmail").addClass('d-block');
    }else{
        $("#nonValidEmail").removeClass('d-block');
        $("#nonValidEmail").addClass('d-none');
    }


}


function validatePhone(value) {
    const pattern = /^01\d{9}$/;
    if (pattern.test(value) === false) {
        $("#nonValidPhone").removeClass('d-none');
        $("#nonValidPhone").addClass('d-block');
    }else{
        $("#nonValidPhone").removeClass('d-block');
        $("#nonValidPhone").addClass('d-none');
    }
}

function validateAge(value) {
    const pattern = /^\d{1,3}$/;
    
    
    if (pattern.test(value) === false) {
        $("#nonValidAge").removeClass('d-none');
        $("#nonValidAge").addClass('d-block');
    }else{
        $("#nonValidAge").removeClass('d-block');
        $("#nonValidAge").addClass('d-none');
    }
}




function validatePassword(value) {
    const pattern = /^.{8,}$/;
    if (pattern.test(value) === false) {
        $("#nonValidPassword").removeClass('d-none');
        $("#nonValidPassword").addClass('d-block');

    }else{
        $("#nonValidPassword").removeClass('d-block');
        $("#nonValidPassword").addClass('d-none');
    }

}

function validateRepassword(repassword){
    if ( $("#password").val() != repassword) {
        $("#nonValidRePassword").removeClass('d-none');
        $("#nonValidRePassword").addClass('d-block');

    }else{
        $("#nonValidRePassword").removeClass('d-block');
        $("#nonValidRePassword").addClass('d-none');
    }
}