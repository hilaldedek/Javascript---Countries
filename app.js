const fetchCountryByName = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`Something went wrong: ${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => renderCountries(data))
    .catch((err) => console.log(err));
};

const renderError = () => {
  const countryDiv = document.querySelector(".alert404");
  countryDiv.innerHTML += `
  <div class="alert content">
    <h2>Countries can not fetched</h2>
    <img src="./img/404.png" alt="" class="w-75"/>
  </div>  
  `;
};

const renderCountries = (data) => {
  console.log(data);
  const countryDiv = document.querySelector(".countrycard");
  const {
    capital,
    currencies,
    flags: { svg },
    languages,
    name: { common },
    region,
  } = data[0];

  console.log(Object.values(languages));
  console.log(Object.values(currencies)[0].name);
  console.log(Object.values(currencies)[0].symbol);

  countryDiv.innerHTML += `
    <div class="card mx-auto m-3 shadow-lg" style="width: 18rem;" id="cardbgcolor">
      <img src="${svg}" class="card-img-top" alt="..." style="width: 18rem;","height="9rem">
      <div class="card-body" >
        <h5 class="card-title">${common}</h5>
        <p class="card-text">${region}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" id="cardbgcolor">
          <i class="fas fa-lg fa-landmark"></i> ${capital}
        </li>
        <li class="list-group-item" id="cardbgcolor">
          <i class="fas fa-lg fa-comments"></i> ${Object.values(languages)}
        </li>
        <li class="list-group-item" id="cardbgcolor">
          <i class="fas fa-lg fa-money-bill-wave"></i>
          ${Object.values(currencies).map((item) => Object.values(item) + " ")}
       </li>
      </ul>
    </div>
  `;
};
document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();
  const cntry = e.target.querySelector("#countryList").value;
  fetchCountryByName(`${cntry}`);

});

fetch("https://restcountries.com/v3.1/all")
  .then((response) => {
    return response.json();
  })
  .then((responseJson) => {
    setAllCountries(responseJson);
  });

const setAllCountries = (responseJson) => {
  const selectBox = document.querySelector("#countryList");

  responseJson.map((item) => {
    const newOption = document.createElement("option");
    newOption.value = item?.name?.common;
    newOption.text = item?.name?.common;
    selectBox.append(newOption);
  });
};

// const btn = document.querySelector("#clickbtn");
// btn.addEventListener("keyPress",(event)=>{
//   if(event.keyCode === 13){
//     btn.click();
//   }
// });




