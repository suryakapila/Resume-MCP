// Serves the repo-root README.md as text. `?raw` inlines it at build time.
import readme from "../../../README.md?raw";

export function loader() {
  return new Response(readme, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
