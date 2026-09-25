import http from "http";
import next from "next";
import { WebSocketServer, WebSocket } from "ws";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const url = new URL(request.url || "", `http://${request.headers.host}`);
    if (url.pathname === "/api/ws") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    }
    // Note: Next.js dev server may handle /_next/webpack-hmr upgrade internally
  });

  wss.on("connection", (clientWs) => {
    const upbitWs = new WebSocket("wss://api.upbit.com/websocket/v1");
    const pendingMessages: Array<string | Buffer> = [];

    upbitWs.on("open", () => {
      while (pendingMessages.length > 0) {
        const msg = pendingMessages.shift();
        if (msg) {
          upbitWs.send(msg);
        }
      }
    });

    clientWs.on("message", (data) => {
      if (upbitWs.readyState === WebSocket.OPEN) {
        upbitWs.send(data as any);
      } else {
        pendingMessages.push(data as any);
      }
    });

    upbitWs.on("message", (data, isBinary) => {
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(data, { binary: isBinary });
      }
    });

    const cleanup = () => {
      if (
        upbitWs.readyState === WebSocket.OPEN ||
        upbitWs.readyState === WebSocket.CONNECTING
      ) {
        upbitWs.close();
      }
      if (
        clientWs.readyState === WebSocket.OPEN ||
        clientWs.readyState === WebSocket.CONNECTING
      ) {
        clientWs.close();
      }
    };

    clientWs.on("close", cleanup);
    clientWs.on("error", cleanup);
    upbitWs.on("close", cleanup);
    upbitWs.on("error", (err) => {
      console.error("Upbit WebSocket error:", err.message);
      cleanup();
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
