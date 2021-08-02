var userArray = [];
var checkLang = [];
var selectedIndex = -1;

function validateform(){  
    var name=document.myform.name.value;  
    var password=document.myform.password.value;  
      
    if (fname==null || fname==""){  
      alert("Name can't be blank");  
      return false;  
    }else if(password.length<6){  
      alert("Password must be at least 6 characters long.");  
      return false;  
      } 
      if ( ( document.contact_form.gender[0].checked == false )
    && ( document.contact_form.gender[1].checked == false ) )
    {
        alert ( "Please choose your Gender: Male or Female" );
        valid = false;
    } 
    if (firstname.value == "") {
        window.alert("Please enter your firstname.");
        firstname.focus();
        return false;
    }
    if (lastname.value == "") {
        window.alert("Please enter your lastname.");
       lastname.focus();
        return false;
    }

    if (city.value == "") {
        window.alert("Please enter your city.");
        city.focus();
        return false;
    }
    if (gender.value == "") {
        window.alert("Please enter your gender.");
        gender.focus();
        return false;
    }
    if (country.value == "") {
        window.alert("Please enter your country.");
        country.focus();
        return false;
    }
    if (language.value == "") {
        window.alert("Please enter your language.");
        language.focus();
        return false;
    }
  } 

function onInsert(){
    var firstName = document.getElementById("fname").value;
    var lastName = document.getElementById("lname").value;
    var u_city = document.getElementById("city").value;
    var male = document.getElementById("male");
    var female = document.getElementById("female");

    if(male.checked == true){
        var u_gender = male.value;
    }else if(female.checked == true){
        var u_gender = female.value;
    }else{
        var u_gender = "";
    }
    
    var u_country = document.getElementById("country").value;
    var checks = document.getElementsByName("lang");

    for(i=0; i<checks.length; i++){
        if(checks[i].checked === true){
            checkLang.push(checks[i].value);
        }
    }

    var userObj = {firstname: firstName, lastname: lastName, city: u_city, gender: u_gender, country: u_country, knownlanguage: checkLang};

    if(selectedIndex === -1){
        userArray.push(userObj);
    }else{
        userArray.splice(selectedIndex-1, 1, userObj);
    }

    localStorage.userRecord = JSON.stringify(userArray);

    init();
    onReset();
}


function init() {
    document.getElementById("tablerows").innerHTML = "";
    if(localStorage.userRecord){
        userArray = JSON.parse(localStorage.userRecord);
        for (var i=0; i< userArray.length; i++){
            prepareTableCell(i+1, userArray[i].firstname, userArray[i].lastname, userArray[i].city, userArray[i].gender, userArray[i].country, userArray[i].knownlanguage);
        }
    }
}

function onReset(){
    selectedIndex = -1;
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("city").value = "";

    if(document.getElementById("male").checked == true){
        document.getElementById("male").checked = false;
    }else{
        document.getElementById("female").checked = false;
    }

    document.getElementById("country").value = "India";
    
    var checks = document.getElementsByName("lang");
    for(i=0; i<checks.length; i++){
        if(checks[i].checked === true){
            checks[i].checked = false;
        }
    }
    checkLang = [];

    document.getElementById("submit").value = "Insert";
}

function prepareTableCell(index, firstName, lastName, u_city, u_gender, u_country, checkLang) {
    var table = document.getElementById("tablerows");
    var row = table.insertRow();
    var idCell = row.insertCell(0)
    var firstNameCell = row.insertCell(1);
    var lastNameCell = row.insertCell(2);
    var cityCell = row.insertCell(3);
    var genderCell = row.insertCell(4);
    var countryCell = row.insertCell(5);
    var languageCell = row.insertCell(6);
    var actionCell = row.insertCell(7);

    idCell.innerHTML = index;
    firstNameCell.innerHTML = firstName;
    lastNameCell.innerHTML = lastName;
    cityCell.innerHTML = u_city;
    genderCell.innerHTML = u_gender;
    countryCell.innerHTML = u_country;
    languageCell.innerHTML = checkLang;
    actionCell.innerHTML = '<button class="action" onclick="editTableRow('+index+')">Edit</button><button class="action" onclick="deleteTableRow('+index+')">Delete</button>';
}

function deleteTableRow(index){
    userArray.splice(index-1,1);
    localStorage.userRecord = JSON.stringify(userArray);
    init();
    onReset();
}

function editTableRow(index){
    selectedIndex = index;
    var userObj = userArray[index-1];

    document.getElementById("fname").value = userObj.firstname;
    document.getElementById("lname").value = userObj.lastname;
    document.getElementById("city").value = userObj.city;

    var male = document.getElementById("male");
    var female = document.getElementById("female");
    if(userObj.gender == male.value){
        document.getElementById("male").checked = true;
    }else if(userObj.gender == female.value){
        document.getElementById("female").checked = true;
    }else{
        document.getElementById("male").checked = false;
        document.getElementById("female").checked = false;
    }

    
    var lang = userObj.knownlanguage;
    var checks = document.getElementsByName("lang");

    for(i=0; i<checks.length; i++){
        checks[i].checked = false;
    }
    
    for(j=0; j<lang.length; j++){
        for(i=0; i<checks.length; i++){
            if(checks[i].value == lang[j]){
                checks[i].checked = true;
            }
        }
    }

    document.getElementById("country").value = userObj.country;
    document.getElementById("submit").value = "Update";
}

function searchCity(){
    var sCity = document.getElementById("search").value.toUpperCase();
    document.getElementById("tablerows").innerHTML = "";
    for(var i=0; i<userArray.length; i++){
        var filter = userArray[i].city.toUpperCase();
        if(filter.indexOf(sCity) > -1){
            userArray = JSON.parse(localStorage.userRecord);
            prepareTableCell(i+1, userArray[i].firstname, userArray[i].lastname, userArray[i].city, userArray[i].gender, userArray[i].country, userArray[i].knownlanguage);
        }
    
    }
}