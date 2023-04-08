import "./info.css";
const About=()=>
{
    return (<>
    <div  style={{width:"100%"}}id="page-top">
        <section className="about-section text-center" id="about">
            <div className=" px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8">
                        <h2 className="text-white mb-4">About</h2>
                        <p className="text-white-50">
                            The objective of this application is to provide APIs for evaluation of the subjective answers after the 
                            neural network is trained with a set of sample answers and natural language processing. The 
                            application server is implemented using node.js, and the database server is implemented using 
                            Mongo DB.
                        </p>
                    </div>
                </div>
                <img className="img-fluid" src="assets/img/ipad.png" alt="..." />
            </div>
        </section>
     </div>
    </>)
}
export default About;