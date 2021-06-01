// Asocia la función que cargará el listado de países al evento de carga de la página.
let selectCountries = document.querySelector('.country');

let loadCountries = () =>{
    //Traer los países -- fetch
    //Los cargo en el elemento html
    let paises = fetch("https://restcountries.eu/rest/v2/all");
    selectCountries.add(new Option('loading...'));
    paises.then(response => response.json())
          .then(data =>{
              console.log(data);
              data.forEach(element =>{
                  let option = new Option(element.name,element.alpha2Code);
                  console.log(selectCountries);
                  selectCountries.add(option);
                  
                  
                })
                selectCountries.addEventListener('change',loadNeighbors);
          })

}

let loadNeighbors = () =>{
    let selectNeighbors = document.querySelector('.neighbor');
    selectNeighbors.innerHTML='';
     let parametros = {
         method: 'get',
         mode: 'no-cors',
         cache: 'no-cache',
         credentials: 'include',
         headers:{
             'Access-Control-Allow-Origin': 'https://fetch-encadenados.netlify.app',
             'Access-Control-Allow-Credentials':true,
             'Content-Type':'text/json'
         }
    }
    let countryCode = selectCountries.options[selectCountries.selectedIndex].value;
    let neighbors = fetch('https://api.geodatasource.com/neighbouring-countries?key=7PUKVKJJCBNQHZQOQO3ZJVBCVHZJHTEP&country_code='+countryCode,{headers:{'Access-Control-Allow-Origin':"*"}});//+countryCode,parametros);
    neighbors.then(response =>response.json())
             .then(data =>{
                console.log(data) ;
                data.forEach(element =>{
                    console.log(element) ;
                let option = new Option(element.country_name,element.country_code);
                selectNeighbors.add(option);
             })})
             .catch(error => console.log(error));
}

window.addEventListener('load',loadCountries);
