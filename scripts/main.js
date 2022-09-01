const apiURLSearch = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_CRSm64WanxWeUWNZsaRyH8IJ9mFRsupX0bt5BQH7pOtqSdIs7ySMVBOoMnr9rOa7';
const apiURLFavorites = 'https://api.thecatapi.com/v1/favourites';
const apiURLDelete = (id)=>`https://api.thecatapi.com/v1/favourites/${id}`;
const apiURLUpload = 'https://api.thecatapi.com/v1/images/upload';
const apiKey = 'live_CRSm64WanxWeUWNZsaRyH8IJ9mFRsupX0bt5BQH7pOtqSdIs7ySMVBOoMnr9rOa7';
const btn = document.querySelector(".anotherBtn");
const uploadBtn = document.querySelector("#uploadBtn");
const spanError = document.querySelector("#error");

// Prueba axio
const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
});
api.defaults.headers.common['X-API-KEY'] = apiKey;
//-----------

btn.addEventListener('click', ()=>loadRandomMichi());
uploadBtn.addEventListener('click', ()=>uploadPicture());

async function loadRandomMichi(){
    const res = await fetch(apiURLSearch);
    const data = await res.json();
    if (res.status != 200){
        spanError.innerHTML = "An error was ocurred "+res.status + data.message;
    } else {
        const img1 = document.querySelector('#img1');
        const img2 = document.querySelector('#img2');
        const fav1 = document.querySelector(".favBtn1");
        const fav2 = document.querySelector(".favBtn2");
        fav1.onclick = ()=>saveFavoritesMichi(data[0].id);
        fav2.onclick = ()=>saveFavoritesMichi(data[1].id);
        img1.src = data[0].url;
        img2.src = data[1].url;
    }
};

async function loadFavoritesMichi(){
    console.log('Favorites');
    const res = await fetch(apiURLFavorites,{
        method: 'GET',
        headers: {
            'X-API-KEY': apiKey,
        },
    });
    const data = await res.json();
    
    if (res.status != 200){
        spanError.innerHTML = "An error was ocurred "+res.status + data.message;
    } else {
        const section = document.querySelector("#favoritesMichis")
        section.innerHTML="";

        data.forEach(michi=>{
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            btn.classList.add('button');
            btn.onclick = ()=> deleteFavoriteMichi(michi.id);
            const btnText = document.createTextNode('Delete');

            btn.appendChild(btnText);
            img.src=michi.image.url;
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        })
    }
};

async function saveFavoritesMichi(id){
    // const res = await fetch(apiURLFavorites, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-API-KEY': apiKey,
    //     },
    //     body: JSON.stringify({
    //         image_id: id,
    //     }),
    // });
    // const data = await res.json();
    // console.log('Save');
    // if (res.status != 200){
    //     spanError.innerHTML = "An error was ocurred "+res.status + data.message;
    // } else {
    //     console.log('Michi added to favorites.');
    //     loadFavoritesMichi();
    // }

    //Prueba axios
    const { data, status } = await  api.post('favourites',{
        image_id: id,
    });
    console.log('Save')

    if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {
        console.log('Michi guardado en favoritos')
        loadFavoritesMichi();
    }

};

async function deleteFavoriteMichi(id){
    const res = await fetch(apiURLDelete(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': apiKey,
        }
    });
    const data = await res.json();
    if (res.status != 200){
        spanError.innerHTML = "An error was ocurred "+res.status + data.message;
    } else {
        console.log('Michi deleted from favorites');
        loadFavoritesMichi();
    }   
};

async function uploadPicture(){
    const form = document.querySelector('#uploadForm');
    const formData = new FormData(form);
    console.log(formData.get('file'));

    const res = await fetch(apiURLUpload, {
        method: 'POST',
        headers: {
            'X-API-KEY': apiKey,
        },
        body: formData,
    });
};

loadRandomMichi();
loadFavoritesMichi();



// HTTP status codes
// 1XX Respuestas Afirmativas
// 2XX Respuestas satisfactorias
// 3XX Re-direcciones
// 4XX Error del cliente
// 5XX Error de servidor


// API KEY
// Autenticacion identificar quies es
// Aurotizacion permisos que tiene.
// el API key se puede hcer de dos formas
// query parameter
// autentication heder
// para obtener la key tenemos que registranos en la api que usamos


// Header HTTP

// Content-TypeError
// application/json es el mas comun, pero hay application/xml, application/zip
// application/x-form-urlencoded
// pero hay muchos mas, no solo app: audio, image, multipart, text, video, vnd, etc

// Authorization
// debemos mirar si la api tiene una especial, en este caso es X-API-KEY

// Cookies
// Location
// Etc



// HTTP Clients - Librerias de Js para consumir apiURLSearch
// Axios es la mas usada
// Trae.js 
// node-fetch
// request
// Etc


//Mode
// no cors- permiteme hacer las solicitudes a odnde yo quiera
// cors

//Cache
// Redirect