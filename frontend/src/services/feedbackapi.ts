import type { NewFeedbackPayload, VoteValue } from "../../constants/feedbacktypes";
import api from "./api";


export const createFeedback = async (payload: NewFeedbackPayload) => {
  const res = await api.post("/feedback", payload);
  return res.data;
};

export const updateFeedback = async (id: string, payload: NewFeedbackPayload) => {
  const res = await api.put(`/feedback/${id}`, payload);
  return res.data;
};

export const deleteFeedback = async (id: string) => {
  await api.delete(`/feedback/${id}`);
};

export const voteFeedback = async (id: string, value: VoteValue) => {
  await api.post(`/feedback/${id}/vote`, { value });
};