import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import * as ButtonComponent from './index';

export default {
  title: 'Design System/Atoms/Button',
  component: ButtonComponent.Element,
};

export const Button: Story<ButtonComponent.Props> = (args) => <ButtonComponent.Element {...args} />;

Button.args  = {
  text: "Button",
  onClick: action('clicked'),
}
