import ClickModel, { type ClickDoc } from '@lib/models/page/click.model'
import VisitModel, { type VisitDoc } from '@lib/models/page/visits.model'
import { AnalyticsService } from '@lib/services/page/page.service'

export const analyticsService = new AnalyticsService<ClickDoc, VisitDoc>(ClickModel, VisitModel)
