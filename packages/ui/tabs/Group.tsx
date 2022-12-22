import React, { useState } from 'react';

import styled from '@emotion/styled';

import { Tab } from './Tab';
import { TabTrack } from './Track';
import { TabGroupInterface } from './types';

const StyledTabGroup = styled.ul`
  position: relative;

  display: flex;
  width: 100%;

  border-bottom: 1px solid ${(props) => props.theme.color.sub[500]};
`;

export const TabGroup = ({ tabs, tabWidth = '120px', tabHeight = '48px' }: TabGroupInterface) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <StyledTabGroup>
      {tabs.map((tab, index) => (
        <Tab
          tabWidth={tabWidth}
          tabHeight={tabHeight}
          key={tab.id}
          isActive={activeTabIndex === index}
          onClick={() => {
            setActiveTabIndex(() => index);
            tab.onClick();
          }}
        >
          {tab.label}
        </Tab>
      ))}
      <TabTrack tabWidth={tabWidth} tabHeight={tabHeight} index={activeTabIndex} />
    </StyledTabGroup>
  );
};
