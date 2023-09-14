import { AppError, AppErrorProps } from "../../../../shared/error/AppError";

export enum FileErrorStatus {
  WRONG_CREDENTIALS,
  MISSING_PARAMS,
}

export const errorProps: Record<FileErrorStatus, AppErrorProps> = {
  [FileErrorStatus.WRONG_CREDENTIALS]: {
    statusCode: 401,
    message: "Dados incorretos",
  },

  [FileErrorStatus.MISSING_PARAMS]: {
    statusCode: 400,
    message: "Parâmetros faltando",
  },
};
export class FileError extends AppError {
  constructor(status: FileErrorStatus) {
    const props = errorProps[status];
    super(props.message, props.statusCode);
  }
}
