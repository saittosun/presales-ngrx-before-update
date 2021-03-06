import { createAction, props } from "@ngrx/store"

import { Lead } from './../../types/lead';

export enum LeadActions {
  setLeads = '[General]= set all leads',
  setLeadsSuccess = '[General]: set all leads success',
  setLeadsFailed = '[General]: set all leads failed',
  getLeads = "[Dashboard]: get all Leads",
  getLeadsSuccess = "[Dashboard]: get leads success",
  getLeadsFailed = "[Dashboard]: get leads failed"
}

export const getLeads = createAction(LeadActions.getLeads);

export const getLeadsSuccess = createAction(
  LeadActions.getLeadsSuccess,
  props<{ results: Lead[] }>()
);

export const getLeadsFailed = createAction(
  LeadActions.getLeadsFailed,
  props<{ error: string }>()
);

export const setLeads = createAction(
  LeadActions.setLeads,
  props<{leads: Lead[]}>()
)
export const setLeadsSuccess = createAction(
  LeadActions.setLeadsSuccess,
  props<{ lead: Lead }>()
)

export const setLeadsFailed = createAction(
  LeadActions.setLeadsFailed,
  props<{ error: string }>()
)
