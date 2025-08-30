import UrlModel, { type UrlDoc } from '@lib/models/url/url.model'
import { UrlService } from '@lib/services/url/url.service'

export const urlService = new UrlService<UrlDoc>(UrlModel)
