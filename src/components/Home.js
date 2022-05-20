import React, { useState } from "react";
import { getIPabuse, getIPreportabuse, getIPvt } from "../requests/Api";

export default function Home() {
  const [ipAdd, setipAdd] = useState("");
  const [abuseData, setabuseData] = useState("");
  const [vtData, setvtData] = useState("");
  const [relationship, setrelationship] = useState("comments");
  const handleIPClick = (e) => {
    e.preventDefault();
    if (ipAdd !== "") {
      Promise.all([
        getIPabuse(ipAdd).then((res) => {
          setabuseData(res.data);
        }),
        getIPvt(ipAdd, relationship).then((res) => {
          console.log(res);
          setvtData(res.data);
        }),
      ]);
    } else {
      alert("Enter IP");
    }
  };
  return (
    <div className="App">
      <div>
        <h2>search-OSINT</h2>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </div>
      <div className="container">
        <form onSubmit={handleIPClick}>
          <label htmlFor="ipadd">IP Address: </label>
          <input
            type="text"
            id="ipadd"
            name="ipadddress"
            placeholder="15.85..."
            value={ipAdd}
            onChange={(e) => setipAdd(e.target.value)}
          ></input>
          <button className="btn" type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
      {vtData !== "" && (
        <div className="container">
          <div>
            <b>AbuseIPDB:</b> {abuseData?.abuseConfidenceScore}% confidence of
            abuse
          </div>
          <p>
            <b>First AbuseIPDB report :</b> {abuseData?.reports[0].comment}
          </p>
          <hr />
          <div>
            <b>VirusTotal:</b> Rated malicious by 2{" "}
            {vtData?.attributes?.last_analysis_stats?.malicious} security
            vendors and having {vtData?.attributes?.reputation}0 reputation
            score by community
            <p>
              <b>First VT comment:</b> {vtData[0]?.attributes?.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
