function setItemToSessionStorage(key, value){
    sessionStorage.setItem(key, value);
};

function getItemFromSessionStorage(key){
    return sessionStorage.getItem(key);
};

function removeItemFromSessionStorage(key){
    sessionStorage.removeItem(key);
}