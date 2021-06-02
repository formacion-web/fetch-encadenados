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

const createElementOption = (countryName, countryCode=' ',coords={lat:0,long:0}) =>{
    let option = new Option(countryName);
    option.value = countryCode;
    option.setAttribute('data-lat',coords.lat);
    option.setAttribute('data-lon',coords.lon);
    
    return option;
};

const loadCountries = async ()=>{

    try {
        
        selectCountries.options[0] = new Option('loading........');

        let data = await fetchData(URLs.countries);
        
        data.map(country => selectCountries.add(createElementOption(country.translations.de,country.alpha2Code,{lat:country.latlng[0],lon:country.latlng[1]})));

        selectCountries.addEventListener('change',changeSelectorCountries);
    } catch (error) {
        console.log(error);
    }
    
}

const changeSelectorCountries = ()=>{
    const selected = selectCountries.options[selectCountries.selectedIndex]
    loadNeighbors(selected);
    const lat = selected.getAttribute('data-lat');
    const lon = selected.getAttribute('data-lon');
    console.log(lat,lon);
    setMap(lat,lon);
    
    

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


const loadNeighbors = async (countrySelected)=>{

    try {
        const parametros = {
            headers:{
                'Access-Control-Allow-Origin':'*'
            }
        }

        const selectNeighbors = document.querySelector('.neighbor');
        selectNeighbors.innerHTML='';
        const countryCode = countrySelected.value;
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
window.addEventListener('load',obtenerLocalizacion);