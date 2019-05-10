const fixPeopleErrors = (apiResponse) => {
    if (apiResponse){
        //known API issue with people #17 - https://github.com/phalt/swapi/issues/99
        apiResponse.splice(16,0,null) 
        //Padmé Amidala, people #35, appears out of order in position 87
        apiResponse.splice(34,0,apiResponse.splice(87,1)[0]);
        //Ratts Tyerell, people #47, appears out of order in position 72
        apiResponse.splice(46,0,apiResponse.splice(73,1)[0]);
    } 
    return apiResponse;
}

//implement fix for species

export default fixPeopleErrors;