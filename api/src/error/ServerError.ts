import { GeneralError } from "./GeneralError"

interface Props {
  message: string
  data?: Record<string, unknown>
}

export class ServerError extends GeneralError {
  constructor({ message, data }: Props) {
    super({ code: 500, message, data})
  }
}