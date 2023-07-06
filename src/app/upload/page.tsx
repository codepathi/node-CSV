import UploadSection from "../components/upload/upload";
import "../styles/uploadPage.css"
const Upload = () => {
    return ( 
        <div className="rightBody">
        <div className="top">
            <div className="leftTop">
                <h4>View Analysis</h4>
                <span>Home &gt; <span style={{color: "#00877C"}}>View Analysis</span></span>
            </div>
            <div className="righttop">
                <button>Support</button>
            </div>
        </div>
        <section className="uploadSection">
        <UploadSection />
        </section>
        <div className="footerInfo">
            
            <ul>
            <h2>Steps to Generate Feedback</h2>
                <li>1. Prepare Your Csv File Download Sample</li>
                <li>2. Upload Your File</li>
                <li>3. Select The Criteria To Process And Analyze.</li>
                <li>4. Click Generate And Enjoy Your Results.</li>
            </ul>
        </div>
        </div>
     );
}
 
export default Upload;