import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("./Navbar"));
const Footer = dynamic(() => import("./Footer"));

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
