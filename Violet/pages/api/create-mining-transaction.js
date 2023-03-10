import {
  AppWallet,
  ForgeScript,
  Transaction,
  BlockfrostProvider,
  largestFirst,
} from "@meshsdk/core";
import { prodMnemonic } from "../../config/wallet";
import {
  assetsMetadata,
  bankWalletAddress,
  costLovelace,
} from "../../config/mint";

export default async function handler(req, res) {
  const recipientAddress = req.body.recipientAddress;
  const utxos = req.body.utxos;
  const calculatedValue = req.body.calculatedValue;
  const blockchainProvider = new BlockfrostProvider("mainnetwlJPuHg34xSl5QOzEMv3zzcLzETEWX5H");

  const appWallet = new AppWallet({
    networkId: 0,
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
    key: {
      type: "mnemonic",
      words: prodMnemonic,
    },
  });

  const appWalletAddress = appWallet.getPaymentAddress();
  const forgingScript = ForgeScript.withOneSignature(appWalletAddress);

  /**
   * TODO: Here you want to select one of your NFT that has not been minted
   */

  const assetIdPrefix = "Violet";
  // In this starter template, we simply randomly pick one from.
  let selectedAssetId = Math.floor(Math.random() * 10).toString();
  const assetMetadata = assetsMetadata[selectedAssetId];
  const assetName = "Violet";

  const asset = {
    assetName: assetName,
    assetQuantity: "1",
    metadata: calculatedValue,
    label: "721",
    recipient: {
      address: recipientAddress,
    },
  };

  const selectedUtxos = largestFirst(costLovelace, utxos, true);

  const tx = new Transaction({ initiator: appWallet });
  tx.setTxInputs(selectedUtxos);
  tx.mintAsset(forgingScript, asset);
  tx.sendLovelace(bankWalletAddress, costLovelace);
  tx.setChangeAddress(recipientAddress);

  const unsignedTx = await tx.build();

  const originalMetadata = Transaction.readMetadata(unsignedTx);

  /**
   * TODO: Here you want to save the `originalMetadata` in a database with the `assetName`
   */

  const maskedTx = Transaction.maskMetadata(unsignedTx);

  // In this starter template, we send `originalMetadata` to the frontend.
  // Not recommended, its better to save the `originalMetadata` in a database.
  res.status(200).json({ assetName, maskedTx, originalMetadata });
}
