import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(
    "firings",
    request.url,
    request.url.includes("mal5a37a816-3853-4300-bbd5-9fed001b3545")
  )
  if (
    request.url.includes("mal5a37a816-3853-4300-bbd5-9fed001b3545") ||
    request.url.includes("ark5a37a816-3853-4300-bbd5-9fed001b3545")
  ) {
    return NextResponse.next()
  } else {
    return NextResponse.redirect(new URL("/404", request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
}
