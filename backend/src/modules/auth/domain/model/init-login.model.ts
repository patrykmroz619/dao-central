import { ethers } from "ethers";

export class InitLoginModel {
  constructor(public walletAddress: string, public secretCode: string) {}

  public getMessageToSign(): string {
    const message = `Please sign this message to log in\n\n`;

    return (
      message +
      ethers.keccak256(this.walletAddress.toLowerCase() + this.secretCode)
    );
  }

  public verifyLoginSignature(signature: string): boolean {
    const message = this.getMessageToSign();

    const signerAddress = ethers.verifyMessage(message, signature);

    const isCorrectSigner =
      signerAddress.toLowerCase() === this.walletAddress.toLowerCase();

    return isCorrectSigner;
  }
}
