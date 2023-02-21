import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, CardMedia, CardContent, CardActions, Typography, Button} from '@mui/material'


const MovieCard = ({movie}) => {

  const navigate = useNavigate();

  const handleReviewForm = () => {
    navigate('/reviewForm', {state:{movie}});
  };


  return (

    <Card className='movie' key={movie.imdbID} variant='outlined' align='center' sx={{height: 650 ,width: 320, margin: '10px', padding:'5px', backgroundColor: '#3076d2', borderRadius: 7, boxShadow: '10px 5px 5px grey'}}>
      <CardMedia sx={{padding:'5px', mt: '5px'}}>
        <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"} alt={movie.Title} />
      </CardMedia>
      <CardContent>
        <Typography variant='h5' color='whitesmoke' sx={{textShadow: '1px 1px black'}}>
          {movie.Title}
        </Typography>
        <Typography variant='h6' color='whitesmoke' sx={{textShadow: '1px 1px black'}}>
          {movie.Year}
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent: 'center'}}>
        <Button onClick={handleReviewForm} sx={{color: 'whitesmoke', textShadow: '1px 1px black'}}>
          Write a review
        </Button>
      </CardActions>
    </Card>
  );
}

export default MovieCard;