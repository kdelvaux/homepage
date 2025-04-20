export default {
  async fetch(request, env, ctx) {
    const STRAVA_ACCESS_TOKEN = env.STRAVA_ACCESS_TOKEN;
    const ATHLETE_ID = env.STRAVA_ATHLETE_ID;

    const stravaUrl = `https://www.strava.com/api/v3/athletes/${ATHLETE_ID}/stats`;

    const res = await fetch(stravaUrl, {
      headers: {
        Authorization: `Bearer ${STRAVA_ACCESS_TOKEN}`
      }
    });

    if (!res.ok) {
      return new Response(`Strava API error: ${res.status}`, { status: res.status });
    }

    const data = await res.json();

    // Pak bijvoorbeeld hardloopafstand van dit jaar
    const runYtdDistanceKm = (data.ytd_run_totals.distance / 1000).toFixed(2);

    return new Response(`YTD run distance: ${runYtdDistanceKm} km`);
  }
}
