import $ from 'jquery'
import {getToken} from "../externalFunctions";

const API_URL = "https://api-panberes.devmrm.ir/graphql";

let getTutorials = (callback) => {
    let query = `
    query{
  tutorials{
    id 
    requirement
    order
    description
    logo
    group
    groupOrder
    link
    links
    watchTimes
    length
    deadline
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
        callback(res)
    })
}
let getUserLinks = (token, callback) => {
    let query = `
query{
links(
token:"${token}"
){
code
age 
name
testResult{
faceAndNeckSkin
hairAndHeadSkin
bodySkin

}
}
}`
    $.ajax({
        url: API_URL,
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify({
            query: query
        }),
        success:(res)=>{
            console.log(res)
            callback(res)
        }
    })

}
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
let addTutorialToWatched = (id, callbackFunction) => {
    let token = getToken()
    let query = `mutation{
addTutorialToWatched(
token: "${token}"
tutorialId: "${id}"
){
  watchedTutorialsId
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
        callbackFunction(res['data']['addTutorialToWatched'])
    })
}
let getUserData = (token, callbackFunction) => {
    let query = `
query{
  user(token:"${token}"){
    username
    uid
    avatar
    name
    phone
    email
    rank
    watchedTutorialsId
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
        console.log('user data:')
        console.log(res)
        window.sessionStorage.setItem('userData',JSON.stringify(res['data']['user']))
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
        window.sessionStorage.setItem('userData', JSON.stringify(res))
        callback(res)
    })
}

let signUp = (introducerId, uid, name, phone, email, username, password, callback) => {
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
    try {
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
    } catch (e) {
    }


}
let NewCustomer = (token, name, age, addressText, phone, gender, maritalStatus, callback) => {
    let query = `
mutation{
  createCustomer(
    token:"${token}",
    name:"${name}",
    age:${age},
    addressText:"${addressText}",
    phone:"${phone}",
    gender:"${gender}",
    maritalStatus:"${maritalStatus}",
  )
  {
    name
  }
}
`
    try {
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
    } catch (e) {
    }


}

let getCustomers = (token, callback) => {
    let query = `
query{
  customers(
    token:"${token}",
  )
  {
    name
    phone
    age
    id
    marketerName
  }
}
`
    try {
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
    } catch (e) {
    }


}


let createCustomerOrder = (token, customerId, items, callback) => {
    let query = `
mutation{
  createCustomerOrder(
    token:"${token}"
    customerId:"${customerId}"
    items:${items}
  )
  {
    customerId
  }
}
`
    try {
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
    } catch (e) {
    }


}

let getSubsets = (token, id, callback) => {
    let query = `
query{
  subsets(
    token:"${token}",
    id:"${id}"
  )
  {
  name
  subsets{
  name
  }
}

`
    try {
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
    } catch (e) {
    }
}
let firstTimeSubset = (token, callback) => {
    let query = `
query{
  user(
    token:"${token}",
  )
  {
  name
  subsets{
  name
  id
  }
}
}

`
    try {
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
    } catch (e) {
    }
}

let createLink = (token, name, age, addressText, phone, gender, maritalStatus, isEditable) => {

    let query = `
mutation{
  createLink(
    token:"${token}"
    name:"${name}"
    age:${age}
    addressText:"${addressText}"
    phone:"${phone}"
    gender:"${gender}"
    maritalStatus:"${maritalStatus}"
    isEditable:${isEditable}
  ){
  code
  }
}

`
    try {
        $.ajax({
            url: API_URL,
            contentType: 'application/json',
            type: "POST",
            data: JSON.stringify({
                query: query
            })
        }).then(() => {
        })
    } catch (e) {
    }
}
export {
    loginQuery,
    getUserData,
    changeUserInfo,
    signUp,
    NewCustomer,
    getCustomers,
    createCustomerOrder,
    getSubsets,
    firstTimeSubset,
    createLink,
    getUserLinks,
    getTutorials,
    addTutorialToWatched
}
