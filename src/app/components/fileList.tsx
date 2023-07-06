import React from "react";

interface props {
    nameOfFile: any;
  }

const FileList:React.FC<props> = ({nameOfFile}) => {
    return ( 
        <div className="flex gap-4  p-2 rounded"> <img src="/images/csv.png" style={{width: '20px'}} alt={nameOfFile} /> {nameOfFile}</div>
     );
}
 
export default FileList;