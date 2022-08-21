import React, { useState } from 'react';

interface TabsProps {
  active: string;
}

interface Props {
  tabs: string[];
  onTabClick?: (tab: string) => any;

  children: ({ active }: TabsProps) => React.ReactNode;
}

function Tabs({ tabs, onTabClick, children }: Props) {
  const [active, setActive] = useState(tabs[0]);

  const renderTabs = function () {
    return tabs.map((tab, index) => (
      <Tab
        key={index}
        title={tab}
        active={active === tab}
        onClick={() => {
          if (onTabClick) onTabClick(tab);
          setActive(tab);
        }}
      />
    ));
  };

  return (
    <div>
      <div className="tabs">{renderTabs()}</div>
      {children({ active })}
    </div>
  );
}

interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  title: string;
}

function Tab({ active, title, ...props }: TabProps) {
  return (
    <div className={`${'tab'} ${active ? 'tab--active' : null}`} {...props}>
      {title}
      {active ? <div className="tab__bar"></div> : null}
    </div>
  );
}

export default Tabs;
