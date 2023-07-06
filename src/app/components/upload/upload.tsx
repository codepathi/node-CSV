"use client"

import "../../styles/uploadSection.css"
import {PiCloudArrowUp} from "react-icons/pi"
import ProgressBar from "@ramonak/react-progress-bar";
import {RxCross1} from "react-icons/rx";
import { useEffect, useState, useRef } from "react";
import Popup from "../../reusable/modal"
import axios, { isCancel} from "axios";
import { MutatingDots } from  'react-loader-spinner';
import FileList from "../fileList";

const UploadSection = () => {    
    
    const [progress, setProgress] = useState(0)
    const [showModal, setModalShow] = useState<boolean>(false);
    const [refetch, setRefetch] = useState(true);
    const cancelFileUpload:any = useRef(null);
    const [file, setFile] = useState<any>();
    const fileInputRef : any = useRef(null);

    useEffect(()=>{
        if(progress == 100){
            setFile(null);
        }
    }, [progress])

    //Get files list
    const [fileList, setFileList] = useState([]);
    useEffect(() => {
        axios.get("/api/read")
        .then((res) => {setFileList(res.data.sort())})
        .catch((err) => console.log(err))

    }, [refetch])


  const onSubmit = async (e: any) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      const config = {
        onUploadProgress: (progressEvent:any) => {
            const PercentageCompleted = (progressEvent.loaded / progressEvent.total) * 100;
                setProgress(PercentageCompleted)
        },
        cancelToken: new axios.CancelToken( (cancel:any) => cancelFileUpload.current = cancel )
      }

      axios.post('/api/upload', data, config)
      .then((res) => {
        setRefetch(!refetch);
      })
      .catch((err)=>{
        console.log(err)
      })
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
    
  }

  const cancleUpload = () => {
    if(cancelFileUpload.current){
        cancelFileUpload.current("cancel")
    }
  }

    return ( 
        <div className="uploadSection">
            <div className="browse">
                <div className="browseInner">
                <div className="cloud">
                    <PiCloudArrowUp />
                </div>
                <span style={{fontSize: '0.8em', fontWeight: '500'}}>Upload your file</span>
                <span style={{fontSize: '0.5em', fontWeight: '300'}}>Drop your Csv file here or Browse</span>

                <label className="custom-file-upload">
                <form>
                <input
                type="file"
                name="file"
                ref={fileInputRef}
                onChange={(e) => { setFile(e.target.files?.[0]); setProgress(0);  }}
                accept = ".csv"
                />
                Browse
                </form>
                
                </label>
                </div>
            </div>
            <div className="uploading">
            {progress > 0 && progress < 90 || file ? <div style={{width: "100%"}}>
                <h2 style={{fontSize: '1.3em', fontWeight: '400'}}>Uploading your file</h2>
                <div className="uploadBarContainer">
                    <div className="csvLogo">
                        <img src="/images/csv.png" alt="csv" />
                    </div>
                    <div className="fileUploading">
                        <span style={{fontSize: '0.8em'}}>{file ? file?.name : "Choose"}</span>
                        <div className="progressBar">
                            <span style={{fontSize: '0.7em'}}>{file?.size*(progress/100)} byte out of {file?.size} byte</span>
                        <ProgressBar completed={progress} height="8px" customLabel=" " bgColor="#00877C"/>
                        </div>
                    </div>
                    <div className="closeBtn"><span onClick={(e) => {setFile(null); cancleUpload(); setProgress(0);}}><RxCross1/></span></div>
                </div>
                </div> : fileList.length > 1 ? 
                (<>
                {
                fileList.reverse().slice(0, 5).map((file:string)=>{
                    return (
                        <FileList nameOfFile={file.substring(13)}/>
                    )
                })}
                </>)   : (<MutatingDots 
                            height="100"
                            width="100"
                            color="#4fa94d"
                            secondaryColor= '#4fa94d'
                            radius='12.5'
                            ariaLabel="mutating-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            />)             
                }
                
                <div className="buttonContainer">
                {file && <button  className="generateBtn" onClick={() => setModalShow(true) }> Confirm Upload </button>}
                </div>
            </div>
            <Popup show={showModal} refetch={refetch} onSubmit = {onSubmit} setRefetch={setRefetch} onHide={() => setModalShow(false) }/>
        </div>
     );
}
 
export default UploadSection;