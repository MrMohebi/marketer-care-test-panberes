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
        console.log(e)
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
        console.log(e)
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
        console.log(e)
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
        console.log(e)
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
        console.log(e)
    }
}
let firstTimeSubset = (token, callback) => {
    console.log('inside')
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
        console.log('inner')
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
export {
    loginQuery,
    getUserData,
    changeUserInfo,
    signUp,
    NewCustomer,
    getCustomers,
    createCustomerOrder,
    getSubsets,
    firstTimeSubset
}
