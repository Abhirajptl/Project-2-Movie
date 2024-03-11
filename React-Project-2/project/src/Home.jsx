import Movies from "./Movies";
import Search from "./Search";

const Home = () => {
  return (
    <div className="container">
      <Search />
      <Movies />
    </div>
  );
};

export default Home;

// http://www.omdbapi.com/?apikey=e7962e4&titanic
