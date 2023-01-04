export const TRANSCODING_JOB_TYPE_NAME = 'transcoding';

export type JobPayload = {
  foo: string;
};

export type JobOptions = {
  processingTime: number;
};

export type JobData = {
  payload: JobPayload;
  options: JobOptions;
};
