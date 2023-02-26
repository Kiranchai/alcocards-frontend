import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const currentUser = useAuth();

  return (
    <>
      {currentUser?.pending ? (
        <div>Loading...</div>
      ) : (
        <>
          <section
            style={{
              background:
                "linear-gradient(0deg, rgba(81,10,50,1) 0%, rgba(45,20,44,1) 35%)",
            }}
          >
            <div
              style={{
                minHeight: "var(--section-height)",
              }}
            >
              <h1>Home</h1>
            </div>
            <footer
              style={{
                boxShadow: "0 2px 5px 4px rgba(0,0,0,.2)",
              }}
            >
              footer
            </footer>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
