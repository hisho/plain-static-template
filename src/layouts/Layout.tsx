import React, {VFC} from 'react';
import {Header} from '@src/layouts/Header/Header';
import {Footer} from '@src/layouts/Footer/Footer';
import {CommonPropsType} from '@src/configs';
import {pagesPropType} from "@src/configs";
import {usePageReducer} from "@src/hooks";
import {PageContext} from "@src/store";


type LayoutPropsType = Partial<Pick<CommonPropsType, 'className'>> &
  Pick<CommonPropsType, 'children'> & {
  page_id: pagesPropType['page_id'],
};

export const Layout: VFC<LayoutPropsType> = (
  {
    page_id,
    className = '',
    children,
  }) => {
  const currentPage = usePageReducer(page_id);


  return (
    <PageContext.Provider value={currentPage}>
      <Header/>
      <main className={`wrapper ${className}`}>
        {children}
      </main>
      <Footer/>
    </PageContext.Provider>
  );
};
