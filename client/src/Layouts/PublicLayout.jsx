import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

export const PublicLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <>
      <Header />
      <Nav />
      {isPageLoading ? (
        <Loading />
      ) : (
        <main className="mx-auto max-w-6xl px-8 py-20 grow w-full">
          <Outlet />
        </main>
      )}

      <Footer />
    </>
  );
};
