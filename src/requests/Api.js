import axios from "axios";
import { apikeys } from "./apiKey.js";

//IP ADDRESS
export const getIPabuse = async (ipAddress) => {
  let response = await axios.get(`/api/v2/check`, {
    params: {
      ipAddress: ipAddress,
      verbose: true,
      // Key: apikeys.abuseIPDB
    },
    headers: {
      Accept: "application/json",
      Key: apikeys.abuseIPDB,
    },
  });
  return response.data;
};

export const getIPvt = async (ip, relationship) => {
  let response = await axios.get(
    `https://www.virustotal.com/api/v3/ip_addresses/${ip}/${relationship}`,
    {
      headers: {
        "x-apikey": apikeys.virusTotal,
      },
    }
  );
  return response.data;
};

export const getIPloc = async () => {
  let response = await axios.get(
    `http://api.ipstack.com/134.201.250.155?access_key=${apikeys.ipStack}&security=1`
  );
  return response.data;
};

//DOMAIN
export const getDomain = async () => {
  let response = await axios.get(
    `https://www.virustotal.com/vtapi/v2/domain/report`,
    {
      params: {
        apikey: apikeys.virusTotal,
        domain: "evil.com",
      },
    }
  );
  return response.data;
};
