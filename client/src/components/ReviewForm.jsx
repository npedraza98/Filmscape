import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Grid, Container, Button, IconButton, Input, Card, CardMedia, CardContent, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TheatersIcon from '@mui/icons-material/Theaters';
import HomeIcon from '@mui/icons-material/Home';

const ReviewForm = () => {

  const [movie, setMovie] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0)
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const location = useLocation();

  const homeRoute = () => {
    navigate('/');
  }



  useEffect(()=> {
    if(location.state){
      setMovie(location.state.movie);
    }
  },[]);

  const validate = () => {
    const tempErrors = {};
    if (!review) {
      tempErrors.review = "Please enter a review.";
    }
    if (!rating) {
      tempErrors.rating = "Please select a rating.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }


  const submitHandler = async(e) => {
    e.preventDefault();
    if(!validate()) return;
    const reviewData = {
      movieId: movie.imdbID,
      movieTitle: movie.Title,
      movieYear: movie.Year,
      moviePoster: movie.Poster,
      movieScore: rating,
      reviewContent: review
    }
    
    try{
      axios.post('http://localhost:8000/api/createReview', reviewData);
      console.log(reviewData)
      navigate('/dashboard')
    }catch(error){
      console.log(error);
    }
  }
    return (
      <div>
        <AppBar position='relative' sx={{mb:'20px'}}>
        <Toolbar sx={{
          justifyContent: 'center'
        }}>
          <TheatersIcon fontSize='large' sx={{mr: '4px'}}/>
          <Typography variant='h3'>
            Filmscape
          </Typography>
          <IconButton sx={{ color: "white"}}>
            <HomeIcon fontSize="large" onClick={homeRoute} sx={{ml: '4px'}}/>
          </IconButton>
        </Toolbar>
      </AppBar>
      {movie ? (
        <div>
          <Grid container spacing={12} align='center' sx={{ height: 575, justifyContent: 'center'}}>
            <Grid item md={5}>
              <Card variant='outlined' align='center' sx={{height: 575 ,width: 320, margin: '10px', padding:'5px', backgroundColor: '#3076d2', borderRadius: 7, boxShadow: '10px 5px 5px grey'}}>
                <CardMedia sx={{padding:'5px', mt: '5px'}}>
                  <img src={movie.Poster}/>
                </CardMedia>
                <CardContent>
                  <Typography variant='h5' color='whitesmoke' sx={{textShadow: '1px 1px black'}}>
                    {movie.Title}
                  </Typography>
                  <Typography variant='h6' color='whitesmoke' sx={{textShadow: '1px 1px black'}}>
                    {movie.Year}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <form onSubmit={submitHandler}>
                <Typography variant='h6' color='red'>
                  {errors.rating && <p>{errors.rating}</p>}
                </Typography>
                <FormControl fullWidth sx={{mt: '10px'}}>
                  <InputLabel>Score</InputLabel>
                  <Select label='score' onChange={e => setRating(e.target.value)}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>
                <br />
                <Typography variant='h6' color='red'>
                  {errors.review && <p>{errors.review}</p>}
                </Typography>
                <Box sx={{height: 450 ,width: 320, mt: '10px'}}>
                  <TextField id='review' multiline rows={10} variant='outlined' label='Review' onChange={e => setReview(e.target.value)} sx={{height: 375 ,width: 320, mt: '10px'}}/>
                </Box>
                <Button type='submit' sx={{border: 'solid', m: '10px'}}>
                  Submit Review
                </Button>
            </form>
            </Grid>
          </Grid>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  )
}

export default ReviewForm;