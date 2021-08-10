let setToken = (token) => {
    window.sessionStorage.setItem('marketerToken', token)
    return token;
}
let removeToken = ()=>{
    window.sessionStorage.removeItem('marketerToken')
}
let getToken = ()=>{
    return window.sessionStorage.getItem('marketerToken');
}

export {setToken,removeToken,getToken}