import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { GET_TRENDING_ALL } from "../GraphQl/TrendingAllQuery";
import { useQuery } from "@apollo/client";
import GlideSlider from "./GlideSlider";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    objectFit: "contain",
    cursor: "pointer",
    height: 280,
    width: 280,
    transition: "all .2s ease-in-out",
    "&:hover": {
      transform: "scale(1.3)",
    },
  },
  imageBox: {},
}));

const TrendingAll = () => {
  const classes = useStyles();
  const { loading, data, error } = useQuery(GET_TRENDING_ALL);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <>
      <Box py={2}>
        <Container maxWidth="xl">
          <Typography variant="h6" gutterBottom>
            Trending
          </Typography>

          <Box>
            <GlideSlider
              settings={{
                gap: 2,
                perView: 5,
                type: "carousel",
                hideNav: true,
                autoplay: 4000,
                peek: {
                  before: 0,
                  after: 30,
                },
              }}
            >
              {data.trendingAll.map((item) => (
                <Box className={classes.imageBox}>
                  <img
                    src={item.poster_path}
                    alt={item.original_title}
                    key={item.id}
                    className={classes.image}
                  />
                </Box>
              ))}
            </GlideSlider>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default TrendingAll;
