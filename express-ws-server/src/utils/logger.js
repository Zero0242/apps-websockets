/**
 * Libreria para emitir logs personalizados
 */
export class Logger {
  constructor(context = "APP", { error = "", success = "", warn = "" } = {}) {
    this.context = context;
    this.errorIcon = error || "🛑";
    this.warnIcon = warn || "🚧";
    this.successIcon = success || "✨";
  }

  formatMessage(simbol = "") {
    const time = new Date().toTimeString().substring(0, 8);
    return `${time} ( ${this.context} ): ${simbol}\t`;
  }

  log(message) {
    console.log(`${this.formatMessage("")} ${message}`);
  }
  error(message) {
    const icon = this.errorIcon;
    console.log(`${this.formatMessage(icon)} ${message}`);
  }
  warn(message) {
    const icon = this.warnIcon;
    console.log(`${this.formatMessage(icon)} ${message}`);
  }
  success(message) {
    const icon = this.successIcon;
    console.log(`${this.formatMessage(icon)} ${message}`);
  }
}
