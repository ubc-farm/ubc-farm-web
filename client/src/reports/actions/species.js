/**
 * Created by Xingyu on 5/30/2017.
 */
export const GET_SPECIES = 'GET_SPECIES';
export const SET_SPECIES = 'SET_SPECIES';


function handleResponse(response){
    if(response.ok){
        console.log("delete field response ok");
        return response.json();
    }else{
        console.log("delete field response error: " + response.json());
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function setSpecies(startLat, endLat, startLon, endLon){
    var url = `http://api.gbif.org/v1/occurrence/search?decimalLatitude=${startLat},${endLat}&decimalLongitude=${startLon},${endLon}`
    return dispatch => {
        return fetch(`http://api.gbif.org/v1/occurrence/search?decimalLatitude=${startLat},${endLat}&decimalLongitude=${startLon},${endLon}`,).
        then(res=>res.json())
        .then((data)=>{
            var species = buildData(data.results);
            return dispatch({type:SET_SPECIES,species}); 
        }); 
    }
}


function buildData(json){
    var specieyClass = ['Aves','Mammalia','Amphibia','Insecta','Arachnida','Plantae', 'Fungi'];
    // var specyKingdom = ['Plantae'];
    var totalSpecies = json.length;

    var structuerJson = {
        "name": "SPECIEY",
        "children": []
    }

    for(var x = 0; x < specieyClass.length; x++){
        var name = specieyClass[x];
        structuerJson.children.push(buildSpecieyData(json,name));
    }
    //Plantae class (is in kingdom)
    return structuerJson;
}


function buildSpecieyData(json, name){

        var children = [];
        var size = 0;
        json.filter((obj)=> {
            var objectKingdomOrClass;
            if(name === 'Plantae' || name === 'Fungi'){
                objectKingdomOrClass = obj.kingdom;
            }else{
                objectKingdomOrClass = obj.class;
            }
            if(objectKingdomOrClass == name){ //kingdom vs class 
                var speciey = children.find(o => o.name == obj.genus);
                if(speciey == undefined){
                    var childObject = {name:obj.genus, size:1}
                    children.push(childObject);
                }else{
                    speciey.size += 1;
                    // children.push(childObject);
                }
            }
    })
    return {name, children};
}

export function fieldDeleted(fieldId){
    return{
        type: GET_SPECIES,
        fieldId
    }
}

export function deleteField(id){
    return dispatch => {
        return fetch(`/data/fields/${id}`, {
            method: 'delete',
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(fieldDeleted(id)));
    }
}

