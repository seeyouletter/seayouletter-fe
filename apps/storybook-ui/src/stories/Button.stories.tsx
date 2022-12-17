import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { DefaultButton } from 'ui';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: DefaultButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DefaultButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DefaultButton> = (args) => <DefaultButton {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  children: '네이버로 로그인하기',
  colorScheme: 'naver',
  isLoading: true,
  loadingText: '로그인 중이에요...',
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  size: 'md',
  children: 'Default Button',
  colorScheme: 'primary',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  children: 'Small Button',
  colorScheme: 'primary',
};

export const XSmall = Template.bind({});
XSmall.args = {
  size: 'xs',
  children: 'XSmall Button',
  colorScheme: 'primary',
  height: '59px',
};
