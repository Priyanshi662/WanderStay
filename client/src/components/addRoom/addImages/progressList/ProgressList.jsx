import { ImageList } from '@mui/material';
import React from 'react';
import ProgressItem from './ProgressItem';

const ProgressList = ({ files }) => {
  return (
    <ImageList rowHeight={200} 
    sx={{
        // muiImageList-root is the root element of the image list
        '&.MuiImageList-root':{
            // changing the default grid-template-columns to auto-fill and take minimum space as 250px and share that space proportionally
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        }
    }}>
      {files.map((file, index) => (
        <ProgressItem file={file} key={index} />
      ))}
    </ImageList>
  );
};

export default ProgressList;