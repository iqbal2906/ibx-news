import {gql} from 'graphql-request'
import sortNewsByImage from './sortNewsByImage';

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {
    const query = gql`
        query MyQuery(
            $access_key: String!
            $categories: String!
            $keywords: String
          ) {
            myQuery(
                access_key: $access_key
                categories: $categories
                countries: "gb"
                sort: "published_desc"
                keywords: $keywords
            ) {
                data {
                    author
                    category
                    country
                    image
                    description
                    language
                    published_at
                    source
                    title
                    url
                }
                pagination {
                    count
                    limit
                    offset
                    total
                }
            }
        }
  `;

  const res = await fetch("https://yangcun.stepzen.net/api/joyous-cheetah/__graphql", {
    method: 'POST',
    cache: isDynamic ? "no-cache" : 'default',
    next: isDynamic ? {revalidate:0} : {revalidate: 20},
    headers: {
        "Content-Type":"application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
    },
    body: JSON.stringify({
        query,
        variables: {
            access_key: process.env.MEDIASTACK_API_KEY,
            categories: category,
            keywords: keywords
        }
    })
  })

  console.log(
    "LOADING NEW DATA >>>>",
    category,
    keywords
  );

  const newsResponse = await res.json()

  const news = sortNewsByImage(newsResponse.data.myQuery)

  return news;
  
}

export default fetchNews;

// stepzen import curl "http://api.mediastack.com/v1/news?access_key=23981374ad7e3a987d0665ffdefe47c8&sources=business,sports"

// stepzen import curl "http://api.mediastack.com/v1/news?access_key=84d04a54aa760dfcb837312455f9e476&countries=us%2Cgb&limit=100&offset=0&sort=published_desc"