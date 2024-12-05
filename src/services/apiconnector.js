import axios from "axios";

export const axiosinstance=axios.create({});

export const apiconnector=(method , url , bodydata , headers ,params ) => {
    console.log("body data in apiconnector" , bodydata)
    console.log("url in api connector" , url)
    console.log("Method is in apiconnector" , method)
    console.log("header in api connector" , headers)
    console.log("params in api connector" , params)
    return axiosinstance( {
        method:`${method}`,
        url:`${url}`,
        data:bodydata ? bodydata : null,
        headers:headers ? headers : null,
        params : params ? params : null 
    })
}  