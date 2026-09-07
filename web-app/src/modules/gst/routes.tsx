import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

import { routePaths } from '@core/config'

const GSTDashboard = lazy(() => import('./pages/GSTDashboard/GSTDashboard'))
const GSTRegistration = lazy(() => import('./pages/GSTRegistration/GSTRegistration'))
const GSTReturn = lazy(() => import('./pages/GSTReturn/GSTReturn'))
const GSTFiling = lazy(() => import('./pages/GSTFiling/GSTFiling'))
const GSTDetails = lazy(() => import('./pages/GSTDetails/GSTDetails'))
const GSTTrack = lazy(() => import('./pages/GSTTrack/GSTTrack'))
const GSTAmendment = lazy(() => import('./pages/GSTAmendment/GSTAmendment'))
const GSTCertificate = lazy(() => import('./pages/GSTCertificate/GSTCertificate'))

export const gstRoutes: RouteObject[] = [
  { path: routePaths.gst.root, element: <GSTDashboard /> },
  { path: routePaths.gst.registration, element: <GSTRegistration /> },
  { path: routePaths.gst.returns, element: <GSTReturn /> },
  { path: routePaths.gst.filing, element: <GSTFiling /> },
  { path: routePaths.gst.amendment, element: <GSTAmendment /> },
  { path: routePaths.gst.certificate, element: <GSTCertificate /> },
  { path: '/gst/file-period', element: <GSTFiling /> },
  { path: '/gst/file-upload', element: <GSTFiling /> },
  { path: '/gst/file-review', element: <GSTFiling /> },
  { path: '/gst/file-payment', element: <GSTFiling /> },
  { path: '/gst/file-success', element: <GSTFiling /> },
  { path: '/gst/file-receipt', element: <GSTFiling /> },
  { path: routePaths.gst.detail(), element: <GSTDetails /> },
  { path: routePaths.gst.track(), element: <GSTTrack /> },
]
