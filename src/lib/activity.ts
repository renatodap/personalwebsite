import "server-only";
import { Client } from "pg";

/**
 * The live dimension: the most recent recorded activities, read straight from
 * the fitness database on the same Postgres instance.
 *
 * WHY THIS IS NOT A SCOREBOARD
 * A running total ("1,247 km this year") is a tally, and tallies read as
 * bragging. A latest activity is a *measurement* — it says the object in the
 * drawing is still in service. That is the difference this file exists to hold.
 *
 * PRIVACY — the hard part, and the reason we do not select `*`
 * `garmin_activity` carries a `payload` jsonb containing the full GPS track, and
 * Garmin auto-names activities after the city they started in ("Indianapolis
 * Running"). Publishing either would put a home address on a public page. The
 * server-side view `public_activity` exposes ONLY date, type, distance and
 * duration; this module never sees anything else, and the role it connects with
 * has SELECT on that one view and nothing else.
 *
 * Degrades silently: if the fitness database is unreachable, unconfigured, or
 * slow, the sheet renders without the live block rather than failing.
 */

export type Activity = {
  date: string;      // YYYY-MM-DD
  type: string;      // "running", "cycling", …
  distanceM: number;
  durationS: number;
};

export type ActivityLine = {
  /** e.g. "RUN" */
  label: string;
  /** e.g. "8.42 KM" */
  distance: string;
  /** e.g. "4:41 /KM" */
  pace: string;
  /** e.g. "3 D AGO" */
  age: string;
};

const QUERY = `
  SELECT activity_date::text AS date,
         activity_type       AS type,
         distance_m          AS "distanceM",
         duration_s          AS "durationS"
  FROM public_activity
  ORDER BY activity_date DESC
  LIMIT $1
`;

/** Type keys worth showing. Anything else is noise on a drawing. */
const LABELS: Record<string, string> = {
  running: "RUN",
  treadmill_running: "RUN",
  trail_running: "TRAIL",
  cycling: "RIDE",
  road_biking: "RIDE",
  indoor_cycling: "RIDE",
  lap_swimming: "SWIM",
  open_water_swimming: "SWIM",
  tennis: "TENNIS",
  walking: "WALK",
  hiking: "HIKE",
  strength_training: "LIFT",
};

function labelFor(type: string): string {
  return LABELS[type] ?? type.replace(/_/g, " ").toUpperCase().slice(0, 10);
}

function formatPace(distanceM: number, durationS: number): string {
  if (distanceM < 100 || durationS <= 0) return "";
  const secPerKm = durationS / (distanceM / 1000);
  const m = Math.floor(secPerKm / 60);
  const s = Math.round(secPerKm % 60);
  return `${m}:${String(s).padStart(2, "0")} /KM`;
}

function formatAge(date: string, now: Date): string {
  const then = new Date(`${date}T12:00:00Z`);
  const days = Math.max(0, Math.round((now.getTime() - then.getTime()) / 86_400_000));
  if (days === 0) return "TODAY";
  if (days === 1) return "1 D AGO";
  return `${days} D AGO`;
}

export function toLines(rows: Activity[], now = new Date()): ActivityLine[] {
  return rows.map((r) => ({
    label: labelFor(r.type),
    distance: r.distanceM >= 100 ? `${(r.distanceM / 1000).toFixed(2)} KM` : "",
    pace: formatPace(r.distanceM, r.durationS),
    age: formatAge(r.date, now),
  }));
}

/**
 * Fetch the newest activities. Returns [] on any failure — a missing live block
 * is a smaller problem than a page that will not render.
 */
export async function recentActivities(limit = 4): Promise<ActivityLine[]> {
  const url = process.env.FITNESS_READONLY_DATABASE_URL;
  if (!url) return [];

  const client = new Client({ connectionString: url, statement_timeout: 3000 });
  try {
    await client.connect();
    const res = await client.query<Activity>(QUERY, [limit]);
    return toLines(res.rows);
  } catch {
    return [];
  } finally {
    await client.end().catch(() => {});
  }
}
