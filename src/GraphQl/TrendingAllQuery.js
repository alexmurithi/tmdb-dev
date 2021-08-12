import {gql} from '@apollo/client';

export const GET_TRENDING_ALL =gql
`
    query GetTrendingAll{
        trendingAll{
            id,
            original_title,
            poster_path,
            backdrop_path,
            vote_average,
            overview,
            media_type
        }
    }
`;