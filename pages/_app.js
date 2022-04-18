import "../styles/globals.scss";
import AuthProvider from "../context/AuthProvider";
import ThemeConfig from "../theme";
import GlobalStyles from "../theme/globalStyles";
import { Wrapper } from "@googlemaps/react-wrapper";
import GlobalStateProvider from "../context/GlobalStateProvider";
import UserDataProvider from "../context/UserDataProvider";
import UtilityProvider from "../context/UtilityProvider";

function MyApp({ Component, pageProps }) {
  return (
    <UtilityProvider>
      <GlobalStateProvider>
        <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}>
          <AuthProvider>
            <UserDataProvider>
              <ThemeConfig>
                <GlobalStyles />
                <Component {...pageProps} />
              </ThemeConfig>
            </UserDataProvider>
          </AuthProvider>
        </Wrapper>
      </GlobalStateProvider>
    </UtilityProvider>
  );
}

export default MyApp;
