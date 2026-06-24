import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Dashboard access required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Tomys Kitchen Owner Dashboard", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  if (process.env.DASHBOARD_BASIC_AUTH !== "true") {
    return NextResponse.next();
  }

  const dashboardUser = process.env.DASHBOARD_USER;
  const dashboardPassword = process.env.DASHBOARD_PASSWORD;

  if (!dashboardUser || !dashboardPassword) {
    return new NextResponse("Dashboard credentials are not configured", {
      status: 500,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Basic ")) {
    return unauthorized();
  }

  try {
    const credentials = atob(authHeader.slice("Basic ".length));
    const separatorIndex = credentials.indexOf(":");
    const username = credentials.slice(0, separatorIndex);
    const password = credentials.slice(separatorIndex + 1);

    if (username === dashboardUser && password === dashboardPassword) {
      const response = NextResponse.next();
      response.headers.set("Cache-Control", "no-store");
      return response;
    }
  } catch {
    return unauthorized();
  }

  return unauthorized();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
