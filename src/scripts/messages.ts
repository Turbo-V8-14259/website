export class MessageHandler {
    private readonly errorDiv: HTMLDivElement;

    constructor(errorDivId: string) {
        this.errorDiv = document.getElementById(errorDivId) as HTMLDivElement;
    }

    private showMessage(msg: string, type: "good" | "bad"): void {
        if (!this.errorDiv) return;
        this.errorDiv.textContent = msg;
        this.errorDiv.className = type;
        this.errorDiv.style.display = "block";
        this.errorDiv.scrollIntoView({behavior: "smooth", block: "nearest"});
    }

    public showError(msg: string): void {
        this.showMessage(msg, "bad");
    }

    public showSuccess(msg: string): void {
        this.showMessage(msg, "good");
    }

    public hide(): void {
        if (this.errorDiv) {
            this.errorDiv.style.display = "none";
            this.errorDiv.textContent = "";
        }
    }
}
