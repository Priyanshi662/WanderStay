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
import AddDetails from './addDetails/addDetails';

import AddImages from './addImages/AddImages';
import AddLocation from './addLocation/AddLocation';
import { useValue } from '../../context/ContextProvider';
import { createRoom } from '../../actions/room';

const AddRoom = (setPage) => {

    const {state:{
        images,
        details,
        location,
        currentUser
    },dispatch}=useValue();

    const [activeStep,setActiveStep]=useState(0)
    const [steps,setSteps]=useState(
        [{label :'Location' ,completed:false},
        {label :'Details' ,completed:false},
        {label :'Images' ,completed:false},]
        )
    const [showSubmit,setShowSubmit]=useState(false);
    
    const findUnfinished=()=>{
        return steps.findIndex(step=>!step.completed)
    }

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
 
    const setComplete = (index, status) => {
        setSteps((steps) => {
          steps[index].completed = status;
          return [...steps];
        });
      };
      
    useEffect(() => {
    if (details.title.length > 4 && details.description.length > 9) {
        if (!steps[1].completed) setComplete(1, true);
    } else {
        if (steps[1].completed) setComplete(1, false);
    }
    }, [details]);     

    useEffect(() => {
        if (location.lng || location.lat) {
          if (!steps[0].completed) setComplete(0, true);
        } else {
          if (steps[0].completed) setComplete(0, false);
        }
      }, [location]);

    useEffect(()=>{
        if (images.length) {
            if (!steps[2].completed) 
                setComplete(2, true);
          } else {
            if (steps[2].completed) 
                setComplete(2, false);
          }
    },[images])

    useEffect(() => {
        if (findUnfinished() === -1) {
          if (!showSubmit) setShowSubmit(true);
        } else {
          if (showSubmit) setShowSubmit(false);
        }
      }, [steps]);
    
      const handleSubmit = () => {
        const room = {
          lng: location.lng,
          lat: location.lat,
          price: details.price,
          title: details.title,
          description: details.description,
          images,
        };
        createRoom(room,currentUser,dispatch,setPage);
      };
      
    return (
        <Container sx={{my:4}}>
            <Stepper 
            activeStep={activeStep} 
            alternativeLabel
            nonLinear
            sx={{mb:3}}
            >
        {steps.map((step,index)=>(
            <Step key={step.label} completed={step.completed}>
                <StepButton onClick={()=>setActiveStep(index)}>
                    {step.label}
                </StepButton>
            </Step>
        ))}        
        </Stepper>

        <Box sx={{ pb: 7 }}>
        {
          {
            0: <AddLocation />,
            1: <AddDetails />,
            2: <AddImages />,
          }[activeStep]
        }
        
        <Stack
        direction='row'
        sx={{pt:2,justifyContent:'space-around'}}
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
        <Stack
        sx={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}
        direction="row"
        >
        {showSubmit && (
            <Button
                variant='contained'
                endIcon={<Send/>}
                onClick={handleSubmit}
                >Submit
            </Button>
        )}
        </Stack>
        
        </Box>
        </Container>
    )
}
export default AddRoom