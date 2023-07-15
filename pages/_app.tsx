import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "@/apollo/apollo";
import { MessageProvider } from "@/components/Message";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <MessageProvider>
        <Component {...pageProps} />
      </MessageProvider>
    </ApolloProvider>
  );
}
