import Menu from "./menu";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Menu className="bg-grey-800"/>
      <div className="bg-grey-800">
      <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
