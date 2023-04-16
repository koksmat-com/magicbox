import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

import { api } from "@/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <FluentProvider theme={webLightTheme}>
      <Component {...pageProps} />
      </FluentProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);



