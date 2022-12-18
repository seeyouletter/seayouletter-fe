import React, { PropsWithChildren } from 'react';

export interface TabInterface {
  id: string;
  label: string | React.ReactNode;
  onClick: () => void;
}

interface TabShape {
  tabWidth: string;
  tabHeight: string;
}

export interface StyledTabInterface extends TabShape {
  isActive: boolean;
}
export interface TabGroupInterface extends TabShape {
  tabs: TabInterface[];
}

export interface TabPropsInterface extends StyledTabInterface, PropsWithChildren {
  onClick: () => void;
}

export interface StyledTabTrackInterface extends TabShape {
  index: number;
}
