import { useAuth } from "../../contexts/AuthContext";
import Footer from "../Footer/Footer";
import "./Home.css";

const Home = () => {
  const currentUser = useAuth();

  return (
    <>
      {currentUser?.pending ? (
        <div>Loading...</div>
      ) : (
        <>
          <main className="home-section">
            <div className="mh welcome">
              <div>
                <div></div>
                <div>
                  <h1>Party starter</h1>
                  <span>
                    Rozkręć swoją imprezę dzięki interaktywnym kartom!
                  </span>
                </div>
              </div>
            </div>
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default Home;
