import React, {useEffect, useState} from 'react'

const Contact = () => {

    const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});

    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            setUserData({...userData, name:data.name, email:data.email, phone:data.phone});

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userContact();
        // eslint-disable-next-line
    }, []);


    // We are storing data in sates...
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value});
    }


    const contactForm = async (e) => {
        e.preventDefault();

        const { name, email, phone, message } = userData;

       const res = await fetch('/contact', {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
               name, email, phone, message
           })
       });

       const data = await res.json();

       if(!data) {
           console.log("Message not send");
       } else {
            alert("Message Send");
            setUserData({...userData, message:""});
       }
    };

    return (
        <>
            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row mt-5 d-flex justify-content-sm-center text-center">

                        <div className="col-md-3 contact_box py-2">
                            <i class="zmdi zmdi-phone pr-3"></i>
                            <span>(+91) 9161757683</span>
                        </div>

                        <div className="col-md-3 contact_box mx-md-5 my-sm-2 my-md-0 py-2">
                            <i class="zmdi zmdi-email pr-3"></i>
                            <span>arshadsiddiqui@gmail.com</span>
                        </div>

                        <div className="col-md-3 contact_box py-2">
                            <i class="zmdi zmdi-pin pr-3"></i>
                            <span>Kolhapur, Maharashtra - India</span>
                        </div>
                    </div>


                    <div className="contact_form mt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg10 offset-lg-1">
                                    <div className="contact_form_container">

                                    <h2 className="contact_form_title">Get in Touch</h2>
                                    <form method="POST" id="contact_form">
                                        <div className="d-flex justify-content-between align-items-between">
                                            <input type="text" id="contact_form_name" name="name"
                                            onChange={handleInputs}
                                            value={userData.name}
                                            placeholder="Your Name" required="true" className=""/>
                                            <input type="email" id="contact_form_email" name="email"
                                            onChange={handleInputs}
                                            value={userData.email}
                                            placeholder="Your Email" required="true" className="mx-2"/>
                                            <input type="number" id="contact_form_phone" name="phone"
                                            onChange={handleInputs}
                                            value={userData.phone}
                                            placeholder="Your Phone Number" required="true" className="" />
                                        </div>
                                        <textarea cols="30" rows="5" className="col-sm-12 mt-2"
                                        name="message"
                                        value={userData.message}
                                        onChange={handleInputs}
                                        placeholder="Enter your message here..."></textarea>

                                        <input type="submit" value="Send Message" onClick={contactForm} />
                                    </form>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Contact
