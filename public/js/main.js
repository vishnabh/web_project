const  submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const data_hide = document.querySelector('.middle_layer');

// click function 

const getInfo = async(event) =>{
    event.preventDefault();
    let cityVal = cityName.value;

    if(cityVal === ""){
        city_name.innerText = `Please write city name before search`;
        city_name.style.color = 'red';
        data_hide.classList.add('data_hide');
    }
    else{
        try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=cb47231d6abdbced88a34d42760c8f40`;
        const response = await fetch(url);
        const data = await response.json();
        const arrData = [data];

        city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
        city_name.style.color = 'white';
        temp_real_val.innerText = arrData[0].main.temp;

        const tempMood =  arrData[0].weather[0].main;

        //consition to check weather 
        if(tempMood == "Clear"){
            temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>";
        } 
        else if(tempMood == "Clouds"){
            temp_status.innerHTML ="<i class='fas fa-cloud' style='color:#f1f2f6;'></i>"
        }
        else if(tempMood == "Rain"){
            temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color:#a4b0be;'></i>"
        }
        else{
            temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>";
        }

        data_hide.classList.remove('data_hide');
        
        }
        catch{
            city_name.innerText = `Please write city name properly`;
            city_name.style.color = '#0097e6';
            data_hide.classList.add('data_hide');
        }
    }

}

submitBtn.addEventListener('click', getInfo);