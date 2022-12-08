import { categories } from "../constants";
import fetchNews from "../lb/fetchNews";

async function Homepage() {
  const news: NewsResponse = await fetchNews(categories.join(","));

  console.log(news);

  return <div></div>;
}

export default Homepage;
