import { useState, useEffect } from "react";

export default function useWebApi(params) {
  const [userConsent, setSuserConsent] = useState(Notification.permission);

  const [userLocation, setUserLocation] = useState("");

  useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((data) => {
        setUserLocation(data.state);
      })
      .catch((err) => {
        setUserLocation(false);
      });
  }, []);

  return { userConsent, setSuserConsent, userLocation, setUserLocation };
}
