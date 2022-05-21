import React, { useState } from "react";
import { getIPabuse } from "../requests/Api";

export default function BulkCheck() {
  const [ipAdd, setipAdd] = useState("");
  const [abuseData, setabuseData] = useState([]);
  const handleIPClick = (e) => {
    e.preventDefault();
    console.log(ipAdd);
    let ipArray = ipAdd.split(",");
    console.log(ipArray);
    ipArray.forEach((e) => {
      getIPabuse(e).then((res) => {
        console.log(res.data);
        setabuseData((oldArray) => [...oldArray, res.data]);
      });
    });
  };

  return (
    <>
      <div className="container">
        <br />
        <form onSubmit={handleIPClick}>
          <label htmlFor="ipadd">Bulk Check IP Address: </label>
          <input
            type="text"
            id="ipadd"
            name="ipadddress"
            placeholder="Comma separated IP addresses"
            value={ipAdd}
            onChange={(e) => setipAdd(e.target.value)}
          ></input>
          <button className="btn" type="submit" value="Submit">
            Check
          </button>
        </form>
        {abuseData.map((e) => (
          <p>
            {e.ipAddress}: {e?.abuseConfidenceScore}%abusive
          </p>
        ))}
      </div>
    </>
  );
}
