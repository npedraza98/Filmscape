import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Grid, Container, Button, IconButton } from '@mui/material';
import TheatersIcon from '@mui/icons-material/Theaters';
import ReviewCard from './ReviewCard';

const Dashboard = () => {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();



    const searchRoute = () => {
        navigate('/search')
    }

    
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8000/api/getAllReviews')
            .then((response) => {
                setReviews(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
    <div>
        <AppBar position='relative' sx={{color: '##3355ff'}}>
            <Toolbar sx={{
                justifyContent: 'center'
            }}>
                <TheatersIcon fontSize='large' sx={{mr: '4px'}}/>
                <Typography variant='h3'>
                    Filmscape
                </Typography>
            </Toolbar>
        </AppBar>
        <Typography variant="h5" align="center" sx={{mt: '10px'}}>
            A place to catalog, rate, and review your favorite movies.
        </Typography>
        <Container align='center'>
            <Button onClick={searchRoute} sx={{border: 'solid', mt: '10px', mb:'10px'}}>
                <Typography variant='h6'>
                    Search movies
                </Typography>
            </Button>
            {loading ? (
                <Typography variant='h5'>Loading...</Typography>
            ) : reviews?.length > 0 ? (
                <Grid container >
                    {reviews.map((review) => (
                        <Grid item md={4} >
                            <ReviewCard review={{...review}} id={review._id} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant='h5' sx={{ mt: '10px' }}>
                    No reviews written yet
                </Typography>
            )}
        </Container>
    </div>
    )
}

export default Dashboard;