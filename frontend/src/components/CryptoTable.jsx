import React, { useEffect, useState } from "react";
import api from "../api";
import { useContext } from "react";
import { MyContext } from "../MyContext";

const CryptoTable = () => {
  const [allCryptos, setAllCryptos] = useState([]);
  const [MyCryptos, setMyCryptos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(10);
  const { me, setMe } = useContext(MyContext);
  const [myinfo, setMyinfo] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await api.get(`/api/showme/`);
        setBalance(response.data.balance);
        console.log("Request succeeded:", response.data);
      } catch (error) {
        console.error("Error caught :", error);
      } finally {
        console.log("final");
        setLoading(false);
      }
    };
    fetchBalance();
  }, [MyCryptos]);

  useEffect(() => {
    me ? setMe(me) : null;
    me ? setMyinfo(me) : null;
  }, [me]);

  const fetchCryptos = async () => {
    setLoading(true);
    try {
      console.log("Fetching cryptocurrencies...");
      const response = await api.get(`/api/crypto/?items=all`);
      console.log("Request succeeded:", response.data);
      setAllCryptos(response.data); // Ensure this is an array
    } catch (error) {
      console.error("Error caught in catch block:", error);

      if (error.response) {
        setError(
          `Error: ${error.response.status} - ${error.response.statusText}`
        );
        console.error("Response error:", error.response);
      } else if (error.request) {
        setError("Error: No response received from server");
        console.error("Request error:", error.request);
      } else {
        setError(`Error: ${error.message}`);
        console.error("Error message:", error.message);
      }
    } finally {
      console.log("Finally block reached");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos();
  }, []);

  const buycrypto = async (id, price) => {
    try {
      console.log("Buying", id);
      const response = await api.post(`/api/crypto/`, {
        ticker: id,
        price: price,
      });
      // setBalance(balance + Number(price));
      console.log("Request succeeded:", response.data);
    } catch (error) {
      console.error("Error caught :", error);
    } finally {
      console.log("final");
      setLoading(false);
      fetchMyCryptos(myinfo);
    }
  };

  const deletecrypto = async (id, price, q) => {
    try {
      console.log("Buying", id);
      const response = await api.delete(`/api/delete_crypto/${id}`, {
        price: price,
      });
      console.log("Request succeeded:", response.data);
      // const ticker = allCryptos?.find(
      //   (asset) => asset.asset_id === crypto.ticker
      // );
      // setBalance(balance - Number(price) * Number(q));
    } catch (error) {
      console.error("Error caught :", error);
    } finally {
      console.log("final");
      setLoading(false);
      fetchMyCryptos(myinfo);
    }
  };

  const fetchMyCryptos = async (myinfo) => {
    try {
      const response = await api.get(`/api/showmycrypto/`);
      setMyCryptos(response.data);
      console.log("Request for your cryptos succeeded:", response.data);
    } catch (error) {
      console.error("Error caught :", error);
    } finally {
      console.log("final mycrypto");
      setLoading(false);
    }
  };

  useEffect(() => {
    myinfo ? fetchMyCryptos(myinfo) : null;
  }, [myinfo]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="bg-white p-10 text-center">
            {/* Main Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome {myinfo?.username}
            </h1>
            {/* Subtitle */}
            <p className="text-gray-500 text-xl mb-8">Buy, trade, and hold</p>
            {/* Stats Section */}
            <div className="flex flex-wrap justify-center gap-8">
              {/* 24h Trading Volume */}
              <div className="bg-blue-50 p-6 rounded-md text-center w-fit">
                <p className="text-blue-600 text-3xl font-bold mb-2">
                  ${balance}
                </p>
                <p className="text-gray-500 text-sm">You Currently Have</p>
              </div>
            </div>
          </div>
          {/* user bought cryptos */}
          <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg  shadow-lg w-[90vw] mx-auto">
            <h2 className="text-2xl font-semibold mb-6">
              Your Cryptocurrencies
            </h2>

            <table className="w-full text-left">
              <tbody>
                {(MyCryptos || []).map((crypto) => {
                  const cryptoData = (allCryptos || []).find(
                    (asset) => asset.asset_id === crypto.ticker
                  );

                  return (
                    <tr
                      key={crypto.ticker}
                      className="border-b last:border-none flex justify-between">
                      <td className="py-4 text-lg font-semibold">
                        {cryptoData?.name || "Unknown Name"}
                      </td>
                      <td className="py-4">{crypto.ticker}</td>
                      <td className="py-4">
                        Price: ${cryptoData?.price_usd || "N/A"}
                      </td>
                      <td className="py-4">Quantity: {crypto.quantity}</td>
                      <td className="py-4">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                          onClick={() =>
                            deletecrypto(
                              crypto.ticker,
                              cryptoData.price_usd,
                              crypto.quantity
                            )
                          }>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-6"></div>
          </div>
          {/* all cryptos */}
          <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg  shadow-lg w-[90vw] mx-auto">
            <h2 className="text-2xl font-semibold mb-6">
              Popular Cryptocurrencies
            </h2>
            <input
              type="number"
              className="w-50px h-20px p-3 border rounded-lg"
              value={quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value)); // Ensure quantity is a number
              }}
            />
            <table className="w-full text-left">
              <tbody>
                {allCryptos?.slice(0, quantity).map((crypto) => (
                  <tr
                    key={crypto.asset_id}
                    className="border-b last:border-none flex justify-between">
                    <td className="py-4 text-lg font-semibold">
                      {crypto.name}
                    </td>
                    <td className="py-4">{crypto.asset_id}</td>
                    <td className={`py-4`}>${crypto.price_usd}</td>
                    <td className="py-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={() =>
                          buycrypto(crypto.asset_id, crypto.price_usd)
                        }>
                        Buy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6"></div>
          </div>
        </>
      )}
    </>
  );
};

export default CryptoTable;
