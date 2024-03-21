export type NotificationErrorProps = {
  message: string;
  context: string;
};

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  messages(context?: string) {
    let message = "";
    this.errors.forEach((error) => {
      if (!context || context === error.context) {
        message += `${error.context}: ${error.message},`;
      }
    });
    return message;
  }

  hasErrors() {
    return this.errors.length > 0;
  }
}
