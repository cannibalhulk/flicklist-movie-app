
import { Link } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
const App = () => {
  return (
    <div className="bg-[#444] text-red text-3xl min-h-screen">
      <Analytics/>
      <h1 className="font-thin">
        <Link to={"/movie"}>Movies</Link>
      </h1>
    </div>
  );
};

export default App;
