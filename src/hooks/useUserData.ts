import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { tokenContext } from "../shared/context/tokenContext";

interface IUserData {
  name?: string;
  iconImg?: string;
}

export function useUserData() {

  const [data, setData] = useState<IUserData>({});
  const token = useContext(tokenContext);

  useEffect(() => {
    if (token.length > 10) {
      axios.get(
        'https://oauth.reddit.com/api/v1/me',
        { headers: { Authorization: `bearer ${token}` } }
      )
        .then((res) => {
          const userData = res.data;
          setData({ name: userData.name, iconImg: userData.icon_img.substring(0, userData.icon_img.indexOf('?')) })
        })
        .catch(console.log)
    }
  }, [token])

  return [data]
}
