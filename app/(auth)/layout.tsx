import "./layout.css";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {/* <div className="animation-container">
        <div className="lightning-container">
          <div className="lightning white"></div>
          <div className="lightning red"></div>
        </div>
        <div className="boom-container">
          <div className="shape circle big white"></div>
          <div className="shape circle white"></div>
          <div className="shape triangle big yellow"></div>
          <div className="shape disc white"></div>
          <div className="shape triangle blue"></div>
        </div>
        <div className="boom-container second">
          <div className="shape circle big white"></div>
          <div className="shape circle white"></div>
          <div className="shape disc white"></div>
          <div className="shape triangle blue"></div>
        </div>
      </div> */}
      <div className="">{children}</div>
    </>
  );
};

export default Layout;
