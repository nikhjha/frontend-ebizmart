import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import getFetch from "../libs/axiosClient";

export default function useSuggestion(s) {
  const [text, setText] = useState(s);
  const [suggestion, setSuggestion] = useState({});
  const time = useRef(0);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getFetch().post("/vendors/isUnique", {
          uniqueName: text,
        });
        setSuggestion({ msg: res.data.message, error: false });
      } catch (e) {
        setSuggestion({ msg: e?.response.data.message, error: true });
      }
    };
    const fetchSuggestion = () => {
      time.current = Date.now();
      setTimeout(() => {
        if (Date.now() - time.current >= 550) {
          fetch();
        }
      }, 600);
    };
    if (text !== "" && user) {
      fetchSuggestion();
    } else {
      setSuggestion({});
    }
  }, [text, user]);
  return [text, setText, suggestion];
}
