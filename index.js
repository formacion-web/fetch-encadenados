// las urls se almacenan en un objeto
const URLs = {
    countries: 'https://restcountries.eu/rest/v2/all',
    neighbors: 'https://api.geodatasource.com/neighbouring-countries?key=7PUKVKJJCBNQHZQOQO3ZJVBCVHZJHTEP&country_code='
} 

// Asocia la función que cargará el listado de países al evento de carga de la página.
const selectCountries = document.querySelector('.country');

const fetchData = async (url)=>{

    try {
        let response = await fetch(url);
        if(response.ok)
            return await response.json();

    } catch (error) {
        throw error;
    }

};

const createElementOption = (countryName, countryCode=' ') =>{
    let option = new Option(countryName);
        option.value = countryCode;
    return option;
};

const loadCountries = async ()=>{

    try {
        
        selectCountries.options[0] = new Option('loading........');

        let data = await fetchData(URLs.countries);
        
        data.map(country => selectCountries.add(createElementOption(country.translations.de,country.alpha2Code)));
        selectCountries.addEventListener('change',loadNeighbors);
    } catch (error) {
        console.log(error);
    }
    
}

// let loadCountries = () =>{
//     //Traer los países -- fetch
//     //Los cargo en el elemento html
//     let paises = fetch("https://restcountries.eu/rest/v2/all");
//     selectCountries.add(new Option('loading...'));
//     paises.then(response => response.json())
//           .then(data =>{
//               console.log(data);
//               data.forEach(element =>{
//                   let option = new Option(element.name,element.alpha2Code);
//                   console.log(selectCountries);
//                   selectCountries.add(option);
                  
                  
//                 })
//                 selectCountries.addEventListener('change',loadNeighbors);
//           })

// }


const loadNeighbors = async ()=>{

    try {
        const parametros = {
            headers:{
                'Access-Control-Allow-Origin':'*'
            }
        }

        const selectNeighbors = document.querySelector('.neighbor');
        selectNeighbors.innerHTML='';
        const countryCode = selectCountries.options[selectCountries.selectedIndex].value;
        const neighbors = await fetchData(URLs.neighbors.concat(countryCode),parametros);
        neighbors.map(country => selectNeighbors.add(createElementOption(country.country_name, country.country_code)));


    } catch (error) {
         console.log(error);        
    }
};

// let loadNeighbors = () =>{
//     let selectNeighbors = document.querySelector('.neighbor');
//     selectNeighbors.innerHTML='';
//      let parametros = {
//          method: 'get',
//          mode: 'no-cors',
//          cache: 'no-cache',
//          credentials: 'include',
//          headers:{
//              'Access-Control-Allow-Origin': 'https://fetch-encadenados.netlify.app',
//              'Access-Control-Allow-Credentials':true,
//              'Content-Type':'text/json'
//          }
//     }
//     let countryCode = selectCountries.options[selectCountries.selectedIndex].value;
//     let neighbors = fetch('https://api.geodatasource.com/neighbouring-countries?key=7PUKVKJJCBNQHZQOQO3ZJVBCVHZJHTEP&country_code='+countryCode,{headers:{'Access-Control-Allow-Origin':"*"}});//+countryCode,parametros);
//     neighbors.then(response =>response.json())
//              .then(data =>{
//                 console.log(data) ;
//                 data.forEach(element =>{
//                     console.log(element) ;
//                 let option = new Option(element.country_name,element.country_code);
//                 selectNeighbors.add(option);
//              })})
//              .catch(error => console.log(error));
// }

window.addEventListener('load',loadCountries);
