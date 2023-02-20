import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const currentUser = useAuth();

  return (
    <>
      {currentUser?.pending ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Home</h1>
        </>
      )}
    </>
  );
};

export default Home;
