// error display none 
document.getElementById('error-message').style.display = 'none';
document.getElementById('error-message-second').style.display = 'none';
// search phone arrow function 
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('phone-details').textContent = ''
    document.getElementById('error-message').style.display = 'none';
    // condition applied for error handling 
    if (searchText == '') {
        document.getElementById('error-message-second').style.display = 'block';
    }
    else {
        // load all data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data.slice(0, 20)))
            .catch(error => displayError(error));
        document.getElementById('error-message-second').style.display = 'none';
    }
}
// error showing function 
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}
// displaying search results 
const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // error message for not finding data 
    if (phones.length == 0) {
        displayError();
    }
    // showing phone 
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card ps-3">
            <div class="card-body">
            <img src="${phone.image}" class="w-50 card-img-top" alt="...">
                <h5 class="card-title">${phone.brand}</h5>
                <h5>${phone.phone_name}</h5>
                <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary">Learn More</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}
// load phone details function 
const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
    document.getElementById('error-message-second').style.display = 'none';
}
// displyaing single phone 
const displayPhoneDetail = phone => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = ''
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="card-body">
        <div>
        <img src="${phone.image}" class="w-50 card-img-top mx-auto" alt="...">
        <h4 class="pt-4">Brand: ${phone.brand}</h4>
        <h4>Phone Name: ${phone.name}</h4>
        <h5>${phone.releaseDate ? phone.releaseDate : 'No release date found'}</h5>
        </div>
        <div>
            <div>
            <h4 class = "pb-2">Specifications</h4>
            <h5>Chipset: <span class="fw-light">${phone.mainFeatures.chipSet}</span>
        </h5>
        <h5>Display: <span class="fw-light">${phone.mainFeatures.displaySize}</span>
        </h5>
        <h5>Storage: <span class="fw-light">${phone.mainFeatures.storage}</span>
        </h5>
        <h5>Ram: <span class="fw-light">${phone.mainFeatures.memory}</span>
        <h5>Sensors: <span class="fw-light">${phone.mainFeatures.sensors}</span>
        </h5>
        <h4>Others</h4>
        <h5>Wlan: <span class="fw-light">${phone.others && phone.others.WLAN ? phone.others.WLAN : 'Not Available'}</span></h5>
        <h5>Bluetooth: <span class="fw-light">${phone.others && phone.others.Bluetooth ? phone.others.Bluetooth : 'Not Available'}</span></h5>
        <h5>GPS: <span class="fw-light">${phone.others && phone.others.GPS ? phone.others.GPS : 'Not Available'}</span></h5>
        <h5>USB: <span class="fw-light">${phone.others && phone.others.USB ? phone.others.USB : 'Not Available'}</span></h5>
            </div>
        </div>
    </div>
    `;
    phoneDetails.appendChild(div);
    // scrolling top for single phone result 
    window.scrollTo(0, 130)
}