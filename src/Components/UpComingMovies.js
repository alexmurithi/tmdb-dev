import React from 'react';
import { Get_UpComing_Movies } from '../GraphQl/UpComingMoviesQuery';
import { useQuery } from '@apollo/client';
import GlideSlider from '../Components/GlideSlider';

import {
    Box,
    Container,
    Typography
}
from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles =makeStyles(theme=>({
    root:{
        color:theme.palette.white
    },
    image:{
        cursor:'pointer',
        transition: 'all .2s ease-in-out',
         objectFit:'contain',
        '&:hover':{
            transform: 'scale(1.3)'
        }
    }
    
   
}))

const UpComingMovies =()=>{
    const classes =useStyles()

    const {loading,error,data} = useQuery(Get_UpComing_Movies);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        
    return(
        <>
            <Box className={classes.root} py={3}>
                <Container maxWidth='xl'>

                    <Typography variant='h6' gutterBottom>Upcoming Movies & Tv Shows</Typography>
                    <GlideSlider
                        settings={{
                        gap: 2,
                        perView: 5,
                        type: "carousel",
                        hideNav: true,
                        autoplay: 2000,
                        peek: {
                        before: 0,
                        after: 30,
                        
                        },
                    }} 
                    >
                      
                             {data.upComingMovies.map((item)=>(
                              <Box > 
                                <img 
                                    src={item.poster_path} 
                                    alt={item.original_title} 
                                    width={280} 
                                    height={280} 
                                    key={item.id}
                                     className={classes.image}
                                />
                              </Box>                    
                            ))}
                       
                    </GlideSlider>
                        
                </Container>
            </Box>
        </>
    )
}

export default UpComingMovies;