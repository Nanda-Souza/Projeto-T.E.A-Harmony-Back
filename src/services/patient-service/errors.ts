import { ApplicationError } from '@/protocols';

export function duplicatedPatientError(): ApplicationError {
  return {
    name: 'DuplicatedPatientError',
    message: 'Patient already registered to this therapist',
  };
}
