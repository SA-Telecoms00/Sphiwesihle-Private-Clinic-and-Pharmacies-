/**
 * Custom Next.js server — entry point for Plesk (Phusion Passenger).
 *
 * Plesk's Node.js extension runs an "Application Startup File" through
 * Passenger; set that field to `server.js`. Passenger intercepts `listen()`
 * and supplies its own socket, so the PORT below is only used when running
 * `node server.js` directly (e.g. local production testing).
 *
 * This file is NOT processed by the Next.js compiler — it must be plain
 * CommonJS that the host's Node version understands. Run `next build` first;
 * this server only serves the prebuilt `.next` output.
 *
 * NOTE: a custom server cannot be combined with `output: "standalone"`
 * (see node_modules/next/dist/docs/.../custom-server.md).
 */
const { createServer } = require("http");

// CJS/ESM interop: `require("next")` may return the function or { default }.
const nextImport = require("next");
const next = nextImport.default || nextImport;

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "0.0.0.0";

// Default to production. Only run dev mode when explicitly requested, so a
// missing NODE_ENV on the host never silently boots a dev server.
const dev = process.env.NODE_ENV === "development";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(port, () => {
      console.log(
        `> Sphiwesihle Clinic ready on http://${hostname}:${port} (${
          dev ? "development" : "production"
        })`
      );
    });
  })
  .catch((err) => {
    console.error("Failed to start Next.js server:", err);
    process.exit(1);
  });
