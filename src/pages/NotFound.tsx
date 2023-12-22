import React, { FC } from "react";

import { NotFoundBlock } from "../components";
const NotFound: FC = () => {
  return (
    <>
      <NotFoundBlock />
      <p>К сожалению, данная страница отсутствует в нашем интернет-магазине</p>
    </>
  );
};

export default NotFound;
