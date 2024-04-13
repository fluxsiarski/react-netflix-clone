import { useEffect, useState } from "react";
import { doc, getDoc, arrayRemove, updateDoc } from "firebase/firestore/lite";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { createImagUrl } from "../services/movieServices";
import { AiOutlineClose } from "react-icons/ai";

const Profile = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  // Function to fetch user data
  const fetchUserData = async () => {
    if (user?.email) {
      try {
        const userDocRef = doc(db, "users", user.email);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setMovies(userDocSnap.data().favShows);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  // Effect to fetch data on component mount and when user.email changes
  useEffect(() => {
    fetchUserData();
  }, [user?.email]);

  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  const handleUnlikeShow = async (movie) => {
    const userDoc = doc(db, "users", user.email);
    try {
      await updateDoc(userDoc, {
        favShows: arrayRemove(movie),
      });
      // Immediately update local state to reflect the change
      setMovies((prevMovies) => prevMovies.filter((m) => m.id !== movie.id));
    } catch (error) {
      console.error("Error removing favorite show:", error);
    }
  };

  return (
    <>
      <div>
        <div>
          <img
            className="block w-full h-[500px] object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/6cefb2f5-90be-4f57-adc4-f6c3c579273d/df4b4259-cd0b-4b26-b7dd-871d1321c2a5/PL-pl-20240401-popsignuptwoweeks-perspective_alpha_website_small.jpg"
            alt="//"
          />
          <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]" />
          <div className="absolute top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-nsans-bold my-2">
              My Shows
            </h1>
            <p className="font-nsans-light text-gray-400 text-lg">
              {user.email}
            </p>
          </div>
        </div>
        {/* movie row*/}

        <div className="relative flex items-center group">
          <MdChevronLeft
            onClick={() => slide(-500)}
            className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={40}
          />
          <div
            id={"slider"}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {movies && movies.length > 0 ? ( // Check if movies is not null/undefined and has elements
              movies.map((movie) => {
                // const { id, title, backdrop_path, poster_path } = movie;
                return (
                  <div
                    key={movie.id}
                    className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
                  >
                    <img
                      className="w-full h-40 block object-cover object-top"
                      src={createImagUrl(
                        movie.backdrop_path ?? movie.poster_path,
                        "w500"
                      )}
                      alt={movie.title}
                    />
                    <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                      <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                        {movie.title}
                      </p>

                      <p>
                        <AiOutlineClose
                          size={30}
                          onClick={() => handleUnlikeShow(movie)}
                          className="absolute top-2 right-2"
                        />
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-white p-8">
                No movies to display.
              </div> // Message when there are no movies
            )}
          </div>
          <MdChevronRight
            onClick={() => slide(500)}
            className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={40}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
