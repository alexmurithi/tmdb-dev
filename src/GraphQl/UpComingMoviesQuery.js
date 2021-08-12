import {gql} from '@apollo/client';

export const Get_UpComing_Movies =gql 
`
    query GetUpComingMovies{
        upComingMovies{
            id,
            original_title,
            poster_path,
            vote_average,
            backdrop_path,
            overview,
            release_date
        }
    }
`;

