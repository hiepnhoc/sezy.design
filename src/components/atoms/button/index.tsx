import * as React from 'react';
import { Link } from "react-router-dom";
import Classnames from 'classnames';
import styles from './styles.css';
import * as Base from '~/_settings';

export enum Type {
  DEFAULT = 'button',
  RESET = 'reset',
  SUBMIT = 'submit',
}

export enum Size {
  S1 = 's1',
  S = 's',
  M = 'm',
  L = 'l',
  L1 = 'l1',
}

export type Props = Base.Props & {
  type?: Type,
  size?: Size,
  onClick?(): void,
  text?: string,
  disabled?: boolean,
  href?: string,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    theme = Base.Theme.DEFAULT,
    size = Size.M,
    onClick,
    text,
    disabled,
    href = '',
  } = props;

  //create props
  const buttonProps = {
    ...Base.mapProps(props, styles, [type, size, theme]),
    onClick: onClick,
  }
  
  const element = href !== ''
    ? <button {...buttonProps}>{text}</button>
    : /^http.+$/.test(href) || href === '' 
      ? <a {...buttonProps}>{text}</a>  
      : <Link  {...buttonProps} to={href}>{text}</Link>;

  return (
    element
  )
}












