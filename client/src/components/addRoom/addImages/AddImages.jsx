import { Paper } from "@mui/material";
import React from "react";
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const AddImages = () => {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
      setFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: { 'image/*': [] },
    });

    return(
        <Paper
        sx={{
            cursor: 'pointer',
            background: '#fafafa',
            color: '#bdbdbd',
            border: '1px dashed #ccc',
            '&:hover': { border: '1px solid #ccc' },
          }}
        >
          {/* getRootProps will get images by dropping into this div */}
          <div style={{ padding: '16px' }} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p style={{ color: 'green' }}>Drop the files here...</p>
            ) : (
              <p>Drag 'n' Drop some files here, or click to select files</p>
            )}
            {/* em is a tag used to render emphasized text , the text enclosed is displayed in italics*/}
            <em>(images with *.jpeg, *.png, *.jpg extension will be accepted)</em>
        </div>
        </Paper>)
    }
export default AddImages;

  
      // <ProgressList {...{ files }} />
      // <ImagesList />
    
