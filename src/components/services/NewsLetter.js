import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { db } from "../Firebase";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function NewsLetter() {
  const [data, setData] = useState({
    mail: "",
  });
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [links, setlinks] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentRef = doc(db, "SOCIAL-MEDIA-URL", "LINKS");
        const documentSnapshot = await getDoc(documentRef);
        if (documentSnapshot.exists()) {
          setlinks(documentSnapshot.data());
        } else {
          setlinks(null); // Handle the case where the document doesn't exist
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsSubmiting(true);
    try {
      if (data.mail !== "") {
        setIsSubmiting(true);
        await addDoc(collection(db, "NEWS-LETTER"), data);
        window.location.reload();
        setIsSubmiting(false);
        alert("success");
      } else {
        alert("Please enter your email");
      }
    } catch (error) {
      setIsSubmiting(false);
      console.log(error);
    }
  };
  // console.log(data);
  return (
    <div className="flex flex-col justify-center items-center space-y-5 md:space-y-0 md:flex-row md:justify-between bg-[#f9f9f9] p-4 px-5 md:px-12 lg:px-24 py-8 mt-3.5">
      {isSubmitting && ( // Render loader only when isSubmitting is true
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#ff5e15"]}
          />
        </div>
      )}
      <div className="space-y-3 w-full md:w-auto">
        <h1 className="font-bold md:text-lg">Our Newsletter</h1>
        <p className="text-[#777777]">
          Sign up for industry alerts, <br className="hidden md:block" /> news &
          insights.
        </p>
      </div>
      <div className="md:flex items-center w-full md:w-auto">
        <input
          type="email"
          placeholder="Your Email Address"
          value={data.mail}
          required
          onChange={(e) => {
            setData({
              ...data,
              mail: e.target.value,
            });
          }}
          className="w-full  px-5 py-2 border-[1px]  lg:w-[30rem] outline-none"
        />
        <button
          onClick={handleSubmit}
          className="bg-[#ff5e15] relative overflow-hidden group  transition ease-in-out duration-300 font-semibold text-sm  text-white px-5 py-3 flex items-center "
        >
          <span className="absolute left-0 h-full w-0 transition-all bg-orange-700 opacity-100 group-hover:w-full duration-300 ease-in-out"></span>
          <span className="relative flex items-center">
            <h1>Request Call Back</h1>
          </span>
        </button>{" "}
      </div>
      <div className="flex items-center space-x-2.5">
        <Link to={links?.Twitter}>
          <AiOutlineTwitter size={28} color="black" cursor={"pointer"} />
        </Link>
        <Link to={links?.Linkedin}>
          <AiFillLinkedin size={28} color="black" cursor={"pointer"} />
        </Link>
        <Link to={links?.Facebook}>
          <AiFillFacebook size={28} color="black" cursor={"pointer"} />
        </Link>
      </div>
    </div>
  );
}
