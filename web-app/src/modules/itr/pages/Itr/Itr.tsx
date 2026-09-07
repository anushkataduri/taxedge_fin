import { Badge, Card, EmptyState, Loader } from '@shared/components'
import { STATUS_LABELS, STATUS_TONES } from '@shared/constants'
import { formatDate } from '@shared/utils'

import { useItr } from '../../hooks/useItr'
import './Itr.css'

export const Itr = () => {
  const { data, isLoading, error } = useItr()

  return (
    <div className="itr-page">
      <header className="itr-page__header">
        <h1 className="itr-page__title">Income tax</h1>
        <p className="itr-page__subtitle">ITR filings, refunds and notices.</p>
      </header>

      {isLoading && <Loader label="Loading Income tax" />}
      {error && <EmptyState title="Could not load Income tax" description={error} />}

      {!isLoading && !error && (
        <Card title="Income tax" subtitle="Wire this module up to the real API in services/itrService.ts">
          <ul className="itr-page__list">
            {(data ?? []).map((item) => (
              <li className="itr-page__row" key={item.id}>
                <div>
                  <p className="itr-page__row-title">{item.title}</p>
                  <p className="itr-page__row-meta">
                    {item.reference} · {formatDate(item.updatedAt)}
                  </p>
                </div>
                <Badge tone={STATUS_TONES[item.status]}>{STATUS_LABELS[item.status]}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}

export default Itr
