import { ReactElement } from 'react';

interface Props {
  navbar?: ReactElement;
  sidebar?: ReactElement;
  children: React.ReactNode;
}

function Layout({ navbar, sidebar, children }: Props) {
  return (
    <div className="layout">
      {navbar ?? null}
      <div className="layout__container">
        {sidebar ?? null}
        <main className="layout__container__content">{children}</main>
      </div>
    </div>
  );
}
export default Layout;
