import React from 'react';
import {Card, CardMedia, CardContent, Typography} from '@mui/material';


const DisplayCard = ({review}) => {

    const { movieTitle, movieYear, moviePoster} = review
  

  return (
    <Card variant='outlined' align='center' sx={{height: 575 ,width: 320, margin: '10px', padding:'5px', backgroundColor: '#3076d2', borderRadius: 7, boxShadow: '10px 5px 5px grey'}}>
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
  </Card>
  )
}

export default DisplayCard