import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

import { routePaths } from '@core/config'

const Itr = lazy(() => import('./pages/Itr/Itr'))

export const itrRoutes: RouteObject[] = [{ path: routePaths.itr, element: <Itr /> }]
