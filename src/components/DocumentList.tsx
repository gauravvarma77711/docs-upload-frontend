import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector} from 'react-redux'
import Modal from 'react-modal'
import { styled } from '@mui/material/styles';
import {customStyles} from '../constants/styleConstants'
import {
  ACTIONS_COLUMN,
  DOC_TYPE_COLUMN,
  UPLOADED_BY_COLUMN,
  UPLOAD_DATE_COLUMN,
  DOCUMENT_NAME_COLUMN,
  PREVIEW_BUTTON,
  DOWNLOAD_BUTTON,
} from "../constants/Constants";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "green",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const DocumentList: React.FC = () => {
  const [allDocs, setAllDocs] = useState<any>([])
  const docs = useSelector((state: any) => state.files);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [previewContent, setPreviewContent] = useState<any>('');
  const [file, setFile] = useState<any>();

  useEffect(() => {
    setAllDocs(docs)
  }, [docs])

  const formatDate = (dateData: any) => {
    let parts = dateData?.split('-');
    let newDate = new Date(parseInt(parts[0]));
    return newDate.getDate() + "/" + (newDate.getMonth()+1) + "/" + newDate.getFullYear();
  }

  const handlePreview = (file: any) => {
    setFile(file)
    if (file.mimetype.includes('image')) {
      setShowPreview(true);
      setPreviewContent(`${process.env.REACT_APP_BACKEND_URL}/preview/${file.filename}`);
    } else if (file.mimetype === 'application/pdf') {
      setShowPreview(true);
      fetch(`${process.env.REACT_APP_BACKEND_URL}/previewpdf/${file.filename}`)
        .then((response) => response.json())
        .then((data) => setPreviewContent(`${process.env.REACT_APP_BACKEND_URL}/preview/${file.filename}`));
    }else{
      setShowPreview(true);
    }
  }

  const handleDownload = (file: any) => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/download/${file}`;
  }

  return (
    <div className="document-list">
      {<h3>Uploaded Files: {docs?.length}</h3>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-header">
            <TableRow>
              <StyledTableCell>{DOCUMENT_NAME_COLUMN}</StyledTableCell>
              <StyledTableCell>{UPLOADED_BY_COLUMN}</StyledTableCell>
              <StyledTableCell>{DOC_TYPE_COLUMN}</StyledTableCell>
              <StyledTableCell>{UPLOAD_DATE_COLUMN}</StyledTableCell>
              <StyledTableCell>{ACTIONS_COLUMN}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {docs?.map((row: any) => (
              <TableRow
                key={row}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.filename}</TableCell>
                <TableCell>John</TableCell>
                <TableCell>
                  {row.originalname?.substr(row.originalname?.indexOf("."))}
                </TableCell>
                <TableCell>{formatDate(row.uploadDateTime)}</TableCell>
                <TableCell>
                  <button
                    key={row?.path}
                    value={row.filename}
                    onClick={() => handlePreview(row)}
                    className="action-btns"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                    {PREVIEW_BUTTON}
                  </button>
                  <button
                    key={row?.path}
                    value={row.filename}
                    onClick={() => handleDownload(row.filename)}
                    className="action-btns"
                  >
                    <i className="fa-solid fa-download"></i>
                    {DOWNLOAD_BUTTON}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal style={customStyles} isOpen={showPreview}>
        <div className="preview-popup">
          <button
            onClick={() => setShowPreview(false)}
            className="fa fa-close close-btn"
          />
          {file?.mimetype.includes("image") ? (
            <img
              src={previewContent}
              alt="File Preview"
              width="800"
              height="600"
            />
          ) : file?.mimetype === "application/pdf" ? (
            <iframe src={previewContent} width="800" height="600" />
          ) : (
            <p>Preview not supported for this file type.</p>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default DocumentList;
