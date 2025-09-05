export class MessageHandler {
    private readonly errorDiv: HTMLDivElement | null;

    constructor(errorDivId: string) {
        this.errorDiv = document.getElementById(errorDivId) as HTMLDivElement | null;
    }

    private showMessage(msg: string, type: "good" | "bad"): void {
        if (!this.errorDiv) return;
        this.errorDiv.textContent = msg;
        this.errorDiv.className = type;
        this.errorDiv.style.display = "block";
        this.errorDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    showError(msg: string): void {
        this.showMessage(msg, "bad");
    }

    showSuccess(msg: string): void {
        this.showMessage(msg, "good");
    }

    hide(): void {
        if (this.errorDiv) {
            this.errorDiv.style.display = "none";
            this.errorDiv.textContent = "";
        }
    }
}
