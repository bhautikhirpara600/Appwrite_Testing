import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { loading } = useOutletContext();

  if (loading) {
    return <h1 className="text-3xl text-center font-bold">Loading...</h1>;
  }
  return (
    <>
      <main className="bg-orange-100 h-screen">
        <h1 className="text-center text-3xl font-bold p-4">Home Page</h1>
        <div className="max-w-200 px-2 mx-auto">
          <img
            className="w-full"
            src="https://m.media-amazon.com/images/I/71u4fU6AWEL._SL1500_.jpg"
            alt="Image-01"
          />
        </div>
      </main>
    </>
  );
};

export default Home;
