import type { FormEvent } from 'react'
import './GSTStepAddressBank.css'

export interface AddressBankFormData {
  address: string
  city: string
  pinCode: string
  state: string
  possessionNature: string
  accountHolderName: string
  accountNumber: string
  ifscCode: string
  accountType: string
  additionalPlaces: string[]
}

interface GSTStepAddressBankProps {
  data: AddressBankFormData
  onChange: (field: keyof AddressBankFormData, value: string | string[]) => void
  onNext: () => void
  onBack: () => void
}

const INDIAN_STATES = [
  'Maharashtra',
  'Karnataka',
  'Delhi',
  'Gujarat',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal',
  'Rajasthan',
  'Haryana',
]

const POSSESSION_TYPES = [
  'Rented',
  'Owned',
  'Leased',
  'Consent',
  'Shared',
]

const ACCOUNT_TYPES = [
  'Current',
  'Savings',
  'Cash Credit',
  'Overdraft',
]

export const GSTStepAddressBank = ({
  data,
  onChange,
  onNext,
  onBack,
}: GSTStepAddressBankProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const handleAddPlace = () => {
    onChange('additionalPlaces', [
      ...data.additionalPlaces,
      `Additional Branch / Warehouse ${data.additionalPlaces.length + 1}`,
    ])
  }

  const handleRemovePlace = (indexToRemove: number) => {
    onChange(
      'additionalPlaces',
      data.additionalPlaces.filter((_, idx) => idx !== indexToRemove)
    )
  }

  return (
    <form onSubmit={handleSubmit} className="gst-step-address-bank">
      {/* 1. Principal place of business */}
      <section className="gst-step-section-card">
        <div className="gst-step-section-card__header">
          <h2 className="gst-step-section-card__title">Principal place of business</h2>
          <p className="gst-step-section-card__subtitle">
            The address the certificate will carry.
          </p>
        </div>

        <div className="gst-step-section-card__body">
          <div className="gst-form-group gst-form-group--full">
            <label className="gst-form-label" htmlFor="address">
              Address <span className="gst-form-required">*</span>
            </label>
            <textarea
              id="address"
              className="gst-form-textarea"
              rows={3}
              value={data.address}
              onChange={(e) => onChange('address', e.target.value)}
              placeholder="Shop 14, Laxmi Complex, FC Road, Shivajinagar"
              required
            />
          </div>

          <div className="gst-form-row">
            <div className="gst-form-group">
              <label className="gst-form-label" htmlFor="city">
                City <span className="gst-form-required">*</span>
              </label>
              <input
                id="city"
                type="text"
                className="gst-form-input"
                value={data.city}
                onChange={(e) => onChange('city', e.target.value)}
                placeholder="Pune"
                required
              />
            </div>

            <div className="gst-form-group">
              <label className="gst-form-label" htmlFor="pinCode">
                PIN code <span className="gst-form-required">*</span>
              </label>
              <input
                id="pinCode"
                type="text"
                className="gst-form-input"
                value={data.pinCode}
                onChange={(e) => onChange('pinCode', e.target.value)}
                placeholder="411004"
                maxLength={6}
                required
              />
            </div>
          </div>

          <div className="gst-form-row">
            <div className="gst-form-group">
              <label className="gst-form-label" htmlFor="state">
                State <span className="gst-form-required">*</span>
              </label>
              <div className="gst-form-select-wrapper">
                <select
                  id="state"
                  className="gst-form-select"
                  value={data.state}
                  onChange={(e) => onChange('state', e.target.value)}
                  required
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="gst-form-group">
              <label className="gst-form-label" htmlFor="possessionNature">
                Nature of possession
              </label>
              <div className="gst-form-select-wrapper">
                <select
                  id="possessionNature"
                  className="gst-form-select"
                  value={data.possessionNature}
                  onChange={(e) => onChange('possessionNature', e.target.value)}
                >
                  {POSSESSION_TYPES.map((pt) => (
                    <option key={pt} value={pt}>
                      {pt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bank account */}
      <section className="gst-step-section-card">
        <div className="gst-step-section-card__header">
          <h2 className="gst-step-section-card__title">Bank account</h2>
          <p className="gst-step-section-card__subtitle">
            Used for refunds and department correspondence.
          </p>
        </div>

        <div className="gst-step-section-card__body">
          <div className="gst-form-row">
            <div className="gst-form-group">
              <label className="gst-form-label" htmlFor="accountHolderName">
                Account holder name <span className="gst-form-required">*</span>
              </label>
              <input
                id="accountHolderName"
                type="text"
                className="gst-form-input"
                value={data.accountHolderName}
                onChange={(e) => onChange('accountHolderName', e.target.value)}
                placeholder="Shree Deshmukh Traders"
                required
              />
            </div>

            <div className="gst-form-group">
              <label className="gst-form-label" htmlFor="accountNumber">
                Account number <span className="gst-form-required">*</span>
              </label>
              <input
                id="accountNumber"
                type="text"
                className="gst-form-input"
                value={data.accountNumber}
                onChange={(e) => onChange('accountNumber', e.target.value)}
                placeholder="As on cheque or statement"
                required
              />
            </div>
          </div>

          <div className="gst-form-row">
            <div className="gst-form-group">
              <label className="gst-form-label" htmlFor="ifscCode">
                IFSC code <span className="gst-form-required">*</span>
              </label>
              <input
                id="ifscCode"
                type="text"
                className="gst-form-input"
                value={data.ifscCode}
                onChange={(e) => onChange('ifscCode', e.target.value.toUpperCase())}
                placeholder="HDFC0000412"
                maxLength={11}
                required
              />
            </div>

            <div className="gst-form-group">
              <label className="gst-form-label" htmlFor="accountType">
                Account type
              </label>
              <div className="gst-form-select-wrapper">
                <select
                  id="accountType"
                  className="gst-form-select"
                  value={data.accountType}
                  onChange={(e) => onChange('accountType', e.target.value)}
                >
                  {ACCOUNT_TYPES.map((at) => (
                    <option key={at} value={at}>
                      {at}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Additional place of business */}
      <section className="gst-step-section-card">
        <div className="gst-step-section-card__header">
          <h2 className="gst-step-section-card__title">Additional place of business</h2>
          <p className="gst-step-section-card__subtitle">Godowns and branches, if any.</p>
        </div>

        <div className="gst-step-section-card__body">
          {data.additionalPlaces.map((place, idx) => (
            <div key={place} className="gst-additional-place-item">
              <span className="gst-additional-place-name">{place}</span>
              <button
                type="button"
                className="gst-btn-remove-place"
                onClick={() => handleRemovePlace(idx)}
                aria-label={`Remove ${place}`}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="gst-btn-add-place"
            onClick={handleAddPlace}
          >
            <span className="gst-btn-add-place__icon">+</span>
            Add another place
          </button>
        </div>
      </section>

      {/* Bottom Actions */}
      <div className="gst-step-actions">
        <button
          type="button"
          className="gst-btn-back"
          onClick={onBack}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gst-btn-back-arrow"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        <button
          type="submit"
          className="gst-btn-continue"
        >
          Continue
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gst-btn-arrow"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </form>
  )
}
