import * as React from 'react';

export const navigationRef = React.createRef<any>();

export const navigatePage = (name: any, params: any) => {
  navigationRef.current?.navigate(name, params);
}