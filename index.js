// Asocia la función que cargará el listado de países al evento de carga de la página.
let selectCountries = document.querySelector('.country');
let selectNeighbors = document.querySelector('.neighbors');
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

    // let parametros = {
    //     method: 'get',
    //     //mode: 'no-cors',
    //     cache: 'no-cache',
    //     credentials: 'include',
    //     headers:{
    //         'Access-Control-Allow-Origin': 'http://localhost:3000',
    //         'Access-Control-Allow-Credentials':true,
    //         'Content-Type':'text/json'
    //     }
    //}
    let countryCode = selectCountries.options[selectCountries.selectedIndex].value;
    let neighbors = fetch('https://api.geodatasource.com/neighbouring-countries?key=7PUKVKJJCBNQHZQOQO3ZJVBCVHZJHTEP&country_code='+countryCode);
    neighbors.then(response =>response.json())
             .then(data => data.forEach(element =>{
                let option = new Option(element.country_name,element.country_code);
                selectNeighbors.add(option);
             }))
             .catch(error => console.log(error));
}

window.addEventListener('load',loadCountries);
