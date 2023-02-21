import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Grid, Button, IconButton, TextField, Box} from '@mui/material';
import TheatersIcon from '@mui/icons-material/Theaters';
import HomeIcon from '@mui/icons-material/Home';
import DisplayCard from './DisplayCard';

const DisplayReview = (props) => {

    const [review, setReview] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    const homeRoute = () => {
        navigate('/dashboard');
    }
    const editRoute = () => {
        navigate(`/editReview/${id}`, {state:{review}})
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/deleteReview/${review._id}`)
        .then((res) => {
            console.log(res.data)
            navigate('/')
        })
        .catch(error => {
            console.log(error)
        });
    }


    useEffect(() => {
        if (id) {
          axios.get(`http://localhost:8000/api/getOneReview/${id}`)
          .then((res)=> {
            setReview(res.data);
            console.log(res.data)
            setIsLoading(false);
          })
          .catch((err)=> {
            console.log(err)
          })
        }
      },[id]);
    console.log("Id passed: ", id);

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
        <Grid container spacing={12} align='center' sx={{ justifyContent: 'center'}}>
            <Grid item md={5}>
                <DisplayCard review={review}/>
            </Grid>
            <Grid item md={5}>
                <Typography variant='h3' color='black' sx={{textShadow: '2px 2px #3076d2'}}>
                    Score: {review.movieScore}/10
                </Typography>
                <Box sx={{height: 475 ,width: 320, mt: '10px'}}>
                    <Typography variant='h6' color='black' sx={{textShadow: '1px 1px gray'}}>
                        {review.reviewContent}
                    </Typography>
                </Box>
                <Button onClick={editRoute} sx={{border: 'solid', m: '10px', alignItems: 'flex-end'}}>
                    Edit Review
                </Button>
                <Button onClick={handleDelete} sx={{border: 'solid', m: '10px'}}>
                    Delete Review
                </Button>
            </Grid>
        </Grid>
    </div>
  )
}

export default DisplayReview