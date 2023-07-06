"use client"

import Modal from 'react-bootstrap/Modal';
import dynamic from "next/dynamic";
import 'bootstrap/dist/css/bootstrap.min.css';

function Popup(props : any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm Upload
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <p>Confirm or cancel your Upload</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="text-red-500 text-sm" onClick={props.onHide}>Cancel</button>
          <button className="generateBtn gradeBtn" style={{marginLeft: "20px"}} onClick={(e)=>{props.onSubmit(e); props.onHide(); props.setRefetch(!props.refetch)}}>Upload</button>
      </Modal.Footer>
    </Modal>
  );
}

export default dynamic (() => Promise.resolve(Popup), {ssr: false})
