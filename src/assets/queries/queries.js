import $ from 'jquery'

const API_URL = "https://api.shcare.ir/panberes/public/graphql";

let loginQuery = (username, password, callBackFunction) => {
    let query = `
query{
  login(
    username:"${username}"
    password:"${password}"
  ){
    token
    name
  }
}`
    $.ajax({
        url: API_URL,
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify({
            query: query
        })
    }).then((res) => {
        callBackFunction(res)
    })
}

let getUserData = (token, callbackFunction) => {
    console.log(token)
    let query = `
query{
  user(token:"${token}"){
    username
    avatar
    name
    phone
    email
    rank
  }
}
`
    $.ajax({
        url: API_URL,
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify({
            query: query
        })
    }).then((res) => {
        callbackFunction(res)
    })
}

let changeUserInfo = (token, avatar, name, phone, email, callback) => {
    let query = `
mutation{
    changeUser(
        token:"${token}"
        name:"${name}"
        avatar:"${avatar}"
        phone:"${phone}"
        email:"${email}"
    )
    {
        name
    }
}
`
    $.ajax({
        url: API_URL,
        contentType: 'application/json',
        type: "POST",
        data: JSON.stringify({
            query: query
        })
    }).then((res) => {
        callback(res)
    })
}

let signUp = (introducerId,uid,name,phone,email,username,password,callback)=>{
let query = `

mutation{
  createUser(
    introducerId:"${introducerId}"
    uid:"${uid}"
    name:"${name}"
    phone:"${phone}"
    email:"${email}"
    username:"${username}"
    password:"${password}"
  )
  {
    name
  }
}
`
    $.ajax({
        url: API_URL,
        contentType: 'application/json',
        type: "POST",
        data: JSON.stringify({
            query: query
        })
    }).then((res) => {
        callback(res)
    })
}
export {loginQuery, getUserData, changeUserInfo,signUp}