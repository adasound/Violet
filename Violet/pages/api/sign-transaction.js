import { AppWallet, Transaction, BlockfrostProvider } from "@meshsdk/core";
import { prodMnemonic } from "../../config/wallet";

export default async function handler(req, res) {
  const assetName = req.body.assetName;
  const signedTx = req.body.signedTx;
  const originalMetadata = req.body.originalMetadata;

  const blockfrost = new BlockfrostProvider("mainnetwlJPuHg34xSl5QOzEMv3zzcLzETEWX5H");

  const appWallet = new AppWallet({
    networkId: 0,
    fetcher: blockfrost,
    submitter: blockfrost,
    key: {
      type: "mnemonic",
      words: prodMnemonic,
    },
  });

  /**
   * TODO: Here you want to retrieve the `originalMetadata` from database with the `assetName`
   */

  const signedOriginalTx = Transaction.writeMetadata(
    signedTx,
    originalMetadata
  );

  const appWalletSignedTx = await appWallet.signTx(signedOriginalTx, true);

  res.status(200).json({ appWalletSignedTx });
}
