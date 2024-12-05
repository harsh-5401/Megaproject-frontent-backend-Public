import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiconnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setpaymentloading } from "../../slices/courseSlice";
import { resetcart } from "../../slices/cartslice";
// import course from "../../../server/models/course";


const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src

        // if script is loaded mark resolve true
        script.onload = ()=> {
            resolve(true)
        }

        // if loading script shows error mark resolve false 
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script);
    })
}

async function sendPaymentSuccessEmail(response, amount, token) {
    console.log("send payment succesful email response=" , response)
    console.log("send payment succesful email token=" , token)
    try {
        await apiconnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderid:  response.razorpay_order_id,
            paymentid: response.razorpay_payment_id,
            amount
        },{
            Authorisation: `Bearer ${token}`
        })
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
        toast.error("Payment success mail failed")
    }
}


export const buyCourse = async (token, courses, userDetails, navigate, dispatch,)=> {

    // console.log("buycourses courses=" , courses)
    // console.log("buycourses userdetails=" , userDetails)

    const toastId = toast.loading("Loading...");

    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        
        if (!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        const orderResponse = await apiconnector("POST", COURSE_PAYMENT_API,
                                                    {courses},
                                                    {  
                                                        Authorisation: `Bearer ${token}`
                                                    })

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }

        console.log("Order Initialized, printing order response", orderResponse);

        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill: {
                name:`${userDetails.firstname}`,
                email:userDetails.email
            },
            handler: (response)=> {
                // send payment succesful emaail
                console.log("response is " , response);
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token)

                // verify payment
                verifyPayment({...response, courses}, token, navigate, dispatch)
            }  
        }

        // Open the modal using options, as order is initialized => payment will be done =>  Payment done mail => verificationPayment => course successfully enrolled mail sent
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", (response)=> {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    } catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }

    toast.dismiss(toastId)
}


async function verifyPayment(bodyData, token, navigate, dispatch) {

    console.log("verofy payment bodydata=" , bodyData)
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setpaymentloading(true));

    try {
        
        const response = await apiconnector("POST", COURSE_VERIFY_API, bodyData,
        {
            Authorisation: `Bearer ${token}`
        })

        console.log("VERIFY PAYMEENT RESPONSE=" , response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Payment successful, you are added to the course!")
        navigate("/dashboard/enrolled-courses");
        dispatch(resetcart());
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setpaymentloading(false));
}
