import {
    AppBar,
    Avatar,
    Box,
    Container,
    Dialog,
    IconButton,
    Rating,
    Slide,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
  } from '@mui/material';
  import { forwardRef, useEffect, useState } from 'react';
  import { useValue } from '../../context/ContextProvider';
  import { Close, StarBorder } from '@mui/icons-material';
  
  import { Swiper, SwiperSlide } from 'swiper/react';
  import { Navigation, Autoplay, EffectCoverflow, Zoom } from 'swiper';
  import 'swiper/swiper-bundle.css';
  import './swiper.css';
  
  const Transition = forwardRef((props, ref) =>  {
    return <Slide direction="up" {...props} ref={ref} />;
  });
  
  const Room = () => {
    const {
      state: { room },
      dispatch,
    } = useValue();
  
    const [place, setPlace] = useState(null);
  
    useEffect(() => {
        // for reverse geocoding for storing the location of the room as IP based on the marker on the map provided by user
      if (room) {
        const token=import.meta.env.VITE_APP_MAP_TOKEN;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${room.lng},${room.lat}.json?access_token=${token}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => setPlace(data.features[0]));
      }
    }, [room]);
  
    const handleClose = () => {
      dispatch({ type: 'UPDATE_ROOM', payload: null });
    };
    return (
      <Dialog
        fullScreen
        open={Boolean(room)}
        onClose={handleClose}
        // transition dialog bottom to up when opened ->done by forward ref on slider
        TransitionComponent={Transition}
      >
        <AppBar position="relative">
          <Toolbar>
            {/* title */}
            <Typography variant="h6" 
            component="h3" 
            sx={{ ml: 2, flex: 1 }}>
              {room?.title}
            </Typography>

            <IconButton color="inherit" onClick={handleClose}>
              <Close />
            </IconButton>

          </Toolbar>
        </AppBar>
        
        {/* image carousal */}
        <Container sx={{ pt: 5 }}>
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow, Zoom]}
            centeredSlides
            slidesPerView={2}
            grabCursor
            navigation
            autoplay
            zoom
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
          >
            {room?.images?.map((url) => (
              <SwiperSlide key={url}>
                <div className="swiper-zoom-container" >
                  <img src={url} alt="room" loading='lazy'/>
                </div>
              </SwiperSlide>
            ))}
            <Tooltip
              title={room?.uName || ''}
              sx={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                // to make it on bottom of the slider
                zIndex: 2,
              }}
            >
              <Avatar src={room?.uPhoto} />
            </Tooltip>
          </Swiper>

          {/* Details section */}
        {/* stack- flex box for price and rating */}
          <Stack sx={{ p: 3 }} spacing={2}>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
                {/* price display */}
              <Box>
                <Typography variant="h6" component="span">
                  {'Price per day : '}
                </Typography>
                <Typography component="span">
                  {room?.price === 0 ? 'Free Stay' : '$' + room?.price}
                </Typography>
              </Box>
              {/* ratings display */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" component="span">
                  {'Ratings: '}
                </Typography>
                <Rating
                  name="room-ratings"
                  defaultValue={3.5}
                  precision={0.5}
                  emptyIcon={<StarBorder />}
                />
              </Box>
            </Stack>

            {/* flex box for place name and address */}
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
                {/* place name */}
              <Box>
                <Typography variant="h6" component="span">
                  {'Place Name: '}
                </Typography>
                <Typography component="span">{place?.text}</Typography>
              </Box>
              {/* address */}
              <Box>
                <Typography variant="h6" component="span">
                  {'Address: '}
                </Typography>
                <Typography component="span">{place?.place_name}</Typography>
              </Box>
            </Stack>

              {/* details about the room */}
            <Stack>
              <Typography variant="h6" component="span">
                {'Details: '}
              </Typography>
              <Typography component="span">{room?.description}</Typography>
            </Stack>
          </Stack>
        </Container>
      </Dialog>
    );
  };
  
  export default Room;