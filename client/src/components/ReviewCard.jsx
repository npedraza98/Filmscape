import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import {Card, CardMedia, CardContent, CardActions, Typography, Button} from '@mui/material';

const ReviewCard = ({review}) => {
  const {movieTitle, movieYear, moviePoster} = review
  const navigate = useNavigate();

  const reviewRoute = (review) => {
    navigate(`/reviewPage/${review._id}`, {state:{review}})
  }
  

  return (
    <Card variant='outlined' align='center' sx={{height: 650 ,width: 320, margin: '10px', padding:'5px', backgroundColor: '#3076d2', borderRadius: 7, boxShadow: '10px 5px 5px grey'}}>
      <CardMedia sx={{padding:'5px', mt: '5px'}}>
        <img src={moviePoster}/>
      </CardMedia>
      <CardContent>
        <Typography variant='h5' color='whitesmoke' sx={{textShadow: '1px 1px black'}}>
          {movieTitle}
        </Typography>
        <Typography variant='h6' color='whitesmoke' sx={{textShadow: '1px 1px black'}}>
          {movieYear}
        </Typography>
      </CardContent>
      <CardActions onClick={() => reviewRoute(review)} sx={{justifyContent: 'center'}}>
        <Button sx={{color: 'whitesmoke', textShadow: '1px 1px black'}}>
          Read Review
        </Button>
      </CardActions>
    </Card>
  );
};

export default ReviewCard;
