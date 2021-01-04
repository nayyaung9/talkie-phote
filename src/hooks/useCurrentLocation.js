import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useCurrentLocation = () => {
  const [geolocation, setGeolocation] = useState({});

  useEffect(() => {
    function error(e) {
      console.log(e);
      toast.error("🦄 Wow so easy!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if ((navigator, geolocation)) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;

        setGeolocation({ latitude, longitude });

        return { latitude, longitude };
      }, error);
    }
  }, []);

  return geolocation;
};

export default useCurrentLocation;
