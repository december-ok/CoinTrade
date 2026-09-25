import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path, ...restQuery } = req.query;

  const pathStr = Array.isArray(path) ? path.join("/") : path || "";
  const targetUrl = new URL(`https://api.upbit.com/${pathStr}`);

  // Query parameter 추가
  Object.entries(restQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => targetUrl.searchParams.append(key, v));
    } else if (value !== undefined) {
      targetUrl.searchParams.append(key, value);
    }
  });

  try {
    const response = await axios({
      method: req.method || "GET",
      url: targetUrl.toString(),
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      data: req.method !== "GET" ? req.body : undefined,
      timeout: 10000,
    });

    res.status(response.status).json(response.data);
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
}
