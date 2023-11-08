import React, { useState, useRef } from 'react';
import axios from 'axios';
import uploadIcon from '../images/icon/upload.png'
import '../components/documentUpload.scss'
import {useDispatch} from 'react-redux'
import {addFiles} from '../actions/actions'
import DocumentList from '../components/DocumentList';
import {useNavigate} from 'react-router-dom'


const FileUpload = () => {
 const [multipleFiles, setMultipleFiles] = useState<any>([]);
 const [filesLoaded, setFilesLoaded] =useState<boolean>(false)
 const fileInputRef = useRef<any>(null)
 const dispatch = useDispatch()
 const navigate = useNavigate();


 const handleFileInputClick = () => {
     fileInputRef.current.click(); 
 }

const handleFileChange = (e: any) => {
  e.target?.files?.length == 1 ? setMultipleFiles([e.target.files[0]]) : setMultipleFiles(e.target.files)
  setFilesLoaded(true)
};

  const handleMultipleFilesUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < multipleFiles.length; i++) {
        formData.append('files', multipleFiles[i]);
        formData.append('uploadDateTime', new Date().toISOString());
    }


    axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload-multiple`, formData).then((response) => {
      console.log(response.data.message);
      console.log('File URLs:', response.data.fileUrls);
      dispatch(addFiles(response.data.fileUrls))
    });
  };

  const handleUploadedPageNavigation = () => {
    navigate('/documents');
  }

  return (
    <div className="page-container">
      <div className="upload-container">
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />
        <div className="icon" onClick={handleFileInputClick}>
          <img src={uploadIcon} />
          <span>Browse Files</span>
        </div>
        {filesLoaded && (
          <div className="show-selected-files">
            {Array.prototype.slice.call(multipleFiles)?.map((file: any) => (
              <span className="tobe-uploaded-files">{file.name}</span>
            ))}
          </div>
        )}
      </div>
      <div className="upload-btn-container">
        {filesLoaded && (
          <button onClick={handleMultipleFilesUpload} className="upload-btn">
            Upload Files
          </button>
        )}
      </div>
      <DocumentList />
      <button
        value="show docs"
        className="show-uploaded-docs"
        onClick={handleUploadedPageNavigation}
      >
        Show Uploaded Docs
      </button>
    </div>
  );
};

export default FileUpload;