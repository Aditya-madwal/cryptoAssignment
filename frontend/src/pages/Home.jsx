import React, { useEffect, useState } from "react";
import api from "../api";
import { useContext } from "react";
import { MyContext } from "../MyContext";
import CryptoTable from "../components/CryptoTable";

const Home = () => {
  const { me, setMe } = useContext(MyContext);
  const [allCryptos, setAllCryptos] = useState(null);
  const [myinfo, setMyinfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    me ? setMe(me) : null;
    me ? setMyinfo(me) : null;
  }, [me]);

  return (
    <div>
      <CryptoTable />
    </div>
  );
};

export default Home;
