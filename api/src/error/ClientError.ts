import { GeneralError } from "./GeneralError"

interface Props {
  message: string
  data?: Record<string, unknown>
}

export class ClientError extends GeneralError {
  constructor({ message, data }: Props) {
    super({ code: 400, message, data})
  }
}