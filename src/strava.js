export async function GET({ locals }) {
  const STRAVA_ACCESS_TOKEN = import.meta.env.STRAVA_ACCESS_TOKEN;
  const ATHLETE_ID = import.meta.env.STRAVA_ATHLETE_ID;

  const url = `https://www.strava.com/api/v3/athletes/${ATHLETE_ID}/stats`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${STRAVA_ACCESS_TOKEN}`
    }
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch Strava data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const data = await res.json();
  const runYtdKm = (data.ytd_run_totals.distance / 1000).toFixed(2);

  return new Response(JSON.stringify({ runYtdKm }), {
    headers: { "Content-Type": "application/json" }
  });
}
