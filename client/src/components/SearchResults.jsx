import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Grid, Container, Button, IconButton, Input, requirePropFactory } from '@mui/material';
import TheatersIcon from '@mui/icons-material/Theaters';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

import MovieCard from './MovieCard';

const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.API_KEY}`;


const SearchResults = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        searchMovies("");
    }, []);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };
    const homeRoute = () => {
        navigate('/');
    }

    return (
        <div>
            <AppBar position='relative'>
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
            <Container align='center' sx={{color: '##3355ff'}}>
            <Input
                sx={{border: 'solid', mt: '10px', borderRadius: '10px', textAlign: 'center'}}
                placeholder="Search movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton onClick={() => searchMovies(searchTerm)}>
                <SearchIcon
                    alt='search'
                />
            </IconButton>
            {movies?.length > 0 ? (
                <Grid container >
                    {movies.map((movie) => (
                        <Grid item md={4} >
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography align='center' variant='h5' sx={{mt: '10px'}}>
                    No movies found
                </Typography>
            )}
            </Container>
        </div>
    );
}

export default SearchResults;
