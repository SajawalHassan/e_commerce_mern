import axios from "axios";
import { useEffect, useState } from "react";

export default (): string[] => {
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  const onSuccess = async (position: GeolocationPosition): Promise<void> => {
    const { latitude, longitude } = position.coords;
    const { data } = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );

    setLocation(data.countryName);
  };

  const onError = (error: GeolocationPositionError): string => {
    return error.message;
  };

  return [location];
};
