import { NextResponse } from "next/server";

const GEOAPIFY_URL = "https://api.geoapify.com/v1/geocode/autocomplete";

export async function GET(request: Request) {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GEOAPIFY_API_KEY is not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("query") || "").trim();

  if (query.length < 2) {
    return NextResponse.json({ cities: [] });
  }

  const url = new URL(GEOAPIFY_URL);
  url.searchParams.set("text", query);
  url.searchParams.set("filter", "countrycode:lk");
  url.searchParams.set("type", "city");
  url.searchParams.set("limit", "10");
  url.searchParams.set("lang", "en");
  url.searchParams.set("format", "json");
  url.searchParams.set("apiKey", apiKey);

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "City lookup failed" }, { status: res.status });
    }

    const payload = (await res.json()) as {
      results?: Array<{ city?: string; state?: string; formatted?: string }>;
    };

    const cities = (payload.results || []).map((item) => ({
      city: item.city || item.formatted || "",
      state: item.state || "",
      label: item.formatted || item.city || "",
    }));

    return NextResponse.json({ cities });
  } catch (error) {
    console.error("Geoapify city search error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
