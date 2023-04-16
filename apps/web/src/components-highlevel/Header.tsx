import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { TopBar } from "@/components-lowlevel/TopBar";

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div style={{ display: "flex", margin: "10px", overflow: "hidden" }}>
        <div style={{ flexGrow: 1 }}>
          <TopBar />
        </div>
        <div className="grow-0">
          <LoginStatus />
        </div>
      </div>
    </header>
  );
}
function LoginStatus() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  return (
    <div>
      <p className={`nojs-show `}>
        {!session && (
          <>
            <span>You are not signed in</span>
            <a
              href={`/api/auth/signin`}
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              Sign in
            </a>
          </>
        )}
        {session?.user && (
          <>
            <span style={{ backgroundImage: `url(${session.user.image})` }} />
            <span>
              <small>Signed in as</small>
              <br />
              <strong>{session.user.email || session.user.name}</strong>
            </span>
            <a
              href={`/api/auth/signout`}
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign out
            </a>
          </>
        )}
      </p>
    </div>
  );
}
