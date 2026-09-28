import { capabilities } from '../septemberContent'
import { companyGalleries } from '../companyGalleries'
import { VisualGallery } from './VisualGallery'

export function CompanyCapabilityGallery() {
  return <div className="section companyCapabilityGrid">
    {capabilities.map(({ title, image, metric, text }) => <VisualGallery key={image} as="article" className="capabilityCard" photoClassName="capabilityPhoto" title={title} photos={companyGalleries[image]}>
      <div className="capabilityCaption"><h3>{title}</h3>{metric && <strong>{metric}</strong>}<span>{text}</span></div>
    </VisualGallery>)}
  </div>
}
