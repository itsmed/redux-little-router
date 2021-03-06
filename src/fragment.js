// @flow
import type { Location } from 'history';
import type { RouterContext } from './provider';

import { PropTypes } from 'react';

type Props = {
  forRoute: string,
  forRoutes: [string],
  withConditions: (location: Location) => bool,
  children: ReactPropTypes.node
};

const Fragment = (
  props: Props,
  context: {
    router: RouterContext
  }
) => {
  const { forRoute, forRoutes, withConditions, children } = props;
  const { matchRoute } = context.router.store;
  const { router: location } = context.router.store.getState();
  const matchResult = matchRoute(location.pathname);

  if (!matchResult) {
    return null;
  }

  if (
    forRoute &&
    matchResult.route !== forRoute
  ) {
    return null;
  }

  if (forRoutes) {
    const anyMatch = forRoutes.some(route =>
      matchResult.route === route
    );

    if (!anyMatch) {
      return null;
    }
  }

  if (withConditions && !withConditions(location)) {
    return null;
  }

  return children;
};

Fragment.contextTypes = {
  router: PropTypes.object
};

export default Fragment;
