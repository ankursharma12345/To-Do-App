import React, { Suspense } from "react";
const Header = React.lazy(() => import("./Header"));

const MainLayout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
    </Suspense>
  );
};

export default MainLayout;
