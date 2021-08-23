import React, { useState, useEffect } from "react";

import { GET_TRENDING_ALL } from "../GraphQl/TrendingAllQuery";
import { useQuery } from "@apollo/client";
import Image from "./Image";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

import { Box, Typography, Button, Container } from "@material-ui/core";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#ffffff",
    backgroundRepeat: "no-repeat",
    objectFit: "contain",
    height: 400,
    paddingTop: theme.spacing(8),
    padding: theme.spacing(3),
  },
  bannerTitle: {
    fontSize: "3rem",
    fontWeight: 800,
  },
  bannerOverview: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  bannerButtons: {
    display: "flex",
    justifyContent: "space-between",
    width: 400,
    "& button": {
      background: "#ffffff",
      color: theme.palette.primary.main,
      borderRadius: 0,
      boxShadow: "none",
      padding: theme.spacing(1),
      width: 100,
    },
  },
}));

const Banner = () => {
  const classes = useStyles();

  const { loading, data, error } = useQuery(GET_TRENDING_ALL);
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    if (data) {
      setMovie(
        data.trendingAll[
          Math.floor(Math.random() * data.trendingAll.length - 1)
        ]
      );
    }
  }, [data]);

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  console.log(movie);

  return (
    <>
      <Box
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%,
                 rgba(0,0,0,0) 100%),url(${movie?.backdrop_path})`,
        }}
        className={classes.banner}
      >
        <Box className={classes.bannerContent}>
          <Typography variant="h1" className={classes.bannerTitle} gutterBottom>
            {movie?.original_title}
          </Typography>

          <Box className={classes.bannerButtons} py={4}>
            <Button variant="contained" startIcon={<PlayCircleOutlineIcon />}>
              Play
            </Button>
            <Button variant="contained" startIcon={<PlaylistAddIcon />}>
              List
            </Button>
          </Box>
          <Typography paragraph className={classes.bannerOverview}>
            {movie?.overview}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(Banner);
