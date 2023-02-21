import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayCard from './DisplayCard';
import { useNavigate, useParams } from 'react-router-dom';
import TheatersIcon from '@mui/icons-material/Theaters';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Toolbar, Typography, Grid, Button, IconButton, FormControl, Select, MenuItem, InputLabel, Box, TextField } from '@mui/material';

const EditReview = () => {

    const [review, setReview] = useState(null);
    const [movieScore, setMovieScore] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const {id} = useParams();

    const navigate = useNavigate();

    const homeRoute = () => {
        navigate('/');
    }

    const validate = () => {
        const tempErrors = {};
        if (!review) {
          tempErrors.review = "Please enter a review.";
        }
        if (!movieScore) {
          tempErrors.movieScore = "Please select a rating.";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
      }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getOneReview/${id}`)
        .then((res)=> {
            setReview(res.data);
            setMovieScore(res.data.movieScore);
            setReviewContent(res.data.reviewContent);
            setIsLoading(false);
        })
        .catch((err)=> {
            console.log(err)
        })
    },[id]);

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/updateReview/${review._id}`,
        {
        movieScore,
        reviewContent
        })
        .then((res)=> {
            console.log(res.data);
            navigate('/dashboard');
        })
        .catch((err)=> {
            console.log(err)
        })
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
        { isLoading ? <div>Loading...</div> : (
            <>
                <Grid container spacing={12} align='center' sx={{ height: 575, justifyContent: 'center'}}>
                    <Grid item md={5}>
                        <DisplayCard review={review}/>
                    </Grid>
                    <Grid item md={5}>
                        <form onSubmit={submitHandler}>
                        <Typography variant='h6' color='red'>
                            {errors.rating && <p>{errors.rating}</p>}
                        </Typography>
                        <FormControl sx={{mt: '10px', width: 320}}>
                            <InputLabel>Score</InputLabel>
                                <Select label='score' value={movieScore} onChange={e => setMovieScore(e.target.value)}>
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
                        <Typography variant='h6' color='red'>
                            {errors.review && <p>{errors.review}</p>}
                        </Typography>
                        <Box sx={{height: 450 ,width: 320, mt: '10px'}}>
                            <TextField id='review' multiline rows={10} variant='outlined' value={reviewContent} onChange={e => setReviewContent(e.target.value)} sx={{height: 375 ,width: 320, mt: '10px'}}/>
                        </Box>
                        <Button type='submit' sx={{border: 'solid', m: '10px'}}>
                            Update Review
                        </Button>
                    </form>
                </Grid>
            </Grid>
            </>
        )}
    </div>
  )
}

export default EditReview