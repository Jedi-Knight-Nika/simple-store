export class BadRequestError extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}

export class InternalServerError extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}

export class NotFoundError extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}
