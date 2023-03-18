import type { NextPage } from "next";
import type { AppType, AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { DefaultLayout } from "~/components/DefaultLayout";
import { trpc } from "~/utils/trpc";
import { MantineProvider } from "@mantine/core";

export type NextPageWithLayout<TProps = Record<string, unknown>, TInitialProps = TProps> = NextPage<
  TProps,
  TInitialProps
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(
    <MantineProvider
      theme={{
        globalStyles: (theme) => ({
          body: {
            backgroundColor: "#0d2d4c",
          },
        }),
      }}
      withGlobalStyles
    >
      <Component {...pageProps} />
    </MantineProvider>,
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
