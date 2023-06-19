import { Cancel, Send } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepButton,
    StepLabel,
  Stepper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddDetails from './addDetails/AddDetails';
import AddImages from './addImages/AddImages';
import AddLocation from './addLocation/AddLocation';

const AddRoom = () => {
    const [activeStep,setActiveStep]=useState(0)
    const [steps,setSteps]=useState(
        [{label :'Location' ,completed:false},
        {label :'Details' ,completed:false},
        {label :'Images' ,completed:false},]
        )
    const handleNext=()=>{
        if(activeStep<steps.length-1)
        {
            setActiveStep(activeStep=>activeStep+1)
        }
        else{
            const stepsIndex=findUnfinished();
            setActiveStep(stepsIndex);
        }
    }
    const checkDisabled=()=>{
        if(activeStep<steps.length-1)  return false
        const index=findUnfinished()
        if(index!==-1)
            return false
        return true
    }
    const findUnfinished=()=>{
        return steps.findIndex(step=>!step.completed)
    }
    return (
        <Container sx={{my:4}}>
            <Stepper 
            activeStep={activeStep} 
            alternativeLabel
            nonLinear
            sx={{mb:3}}
            >
        {
        steps.map((step,index)=>{
            <Step key={index} completed={step.completed}>
                <StepLabel>{step.label}</StepLabel>
            </Step>
        })}        
        </Stepper>
        <Box sx={{ pb: 7 }}>
        {
          {
            0: <AddLocation />,
            1: <AddDetails />,
            2: <AddImages />,
          }[activeStep]
        }
        </Box>
        <Stack
        direction='row'
        sx={{pt:2,pb:7,justifyContent:'space-around'}}
        >
            <Button
            color="inherit"
            disabled={activeStep===0}
            onClick={()=>setActiveStep(activeStep=>activeStep-1)}
            >
                    Back
            </Button>
            <Button
            disabled={checkDisabled()}
            onClick={handleNext}
            >
                    Next
            </Button>
        </Stack>
        </Container>


    )
}
export default AddRoom