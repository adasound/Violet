import Image from "next/image";
import Head from "next/head";
import { CardanoWallet,  useWallet } from "@meshsdk/react";
import { createTransaction, signTransaction } from "../backend";
import { useState, useEffect } from "react";
import * as SimpleBase from 'simple-base';
import { resolveSlotNo } from '@meshsdk/core';
import { CodeBlock, dracula } from "react-code-blocks";




const blakejs = require('blakejs');
const slot = resolveSlotNo('mainnet');
const slotencoded = SimpleBase.base58.encode(slot);
const vBefore = '{"Violet": '
const vAfter = ' }'





export default function Home() {


  const { wallet, connected } = useWallet();
  const [txHash, setTxHash] = useState(null);
  const [loading, setLoading] = useState(false);

  const [ext, setExt] = useState('');
  const [eid, setEid] = useState('');
  const [vch, setVch] = useState('');
  const [opt, setOpt] = useState('');
  const [rtc, setRtc] = useState('');
/*  const [rtc, setRtc] = useState(''); */
  const [calculatedValue, setCalculatedValue] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');




  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(calculatedValue);
  };

  useEffect(() => {
    setCalculatedValue(calculateValue(ext+eid+vch+'.'+rtc+opt));
  }, [ext+eid+vch+'.'+rtc+opt]);



  const calculateValue = (input) => {


    const rtc = slotencoded.slice(-3);
    setRtc(rtc);
    const extp = blakejs.blake2bHex(ext);
    const eidp=blakejs.blake2bHex(eid);
    const vchp=blakejs.blake2bHex(vch);
    const rtcp = blakejs.blake2bHex(rtc);
    const optp=blakejs.blake2bHex(opt);


    return  (blakejs.blake2sHex(extp+eidp+vchp+'.'+rtcp+optp));


  }


/*  async function onChain({ code, language, showLineNumbers }) {
  return (
    <CodeBlock
      text={code}
      language={language}
      showLineNumbers={showLineNumbers}
      theme={dracula}
    />
  );
}

*/


 async function startMining() {
    setLoading(true);
    try {










      const recipientAddress = await wallet.getChangeAddress();
      const utxos = await wallet.getUtxos();

      const { assetName, maskedTx, originalMetadata } = await createTransaction(
        recipientAddress,
        utxos,
        calculatedValue
      );

      const signedTx = await wallet.signTx(maskedTx, true);

      const { appWalletSignedTx } = await signTransaction(
        assetName,
        signedTx,
        originalMetadata,
      );
      const txHash = await wallet.submitTx(appWalletSignedTx);


      setTxHash(txHash);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (



<div>
<link rel="shortcut icon" href="/static/favicon.ico" />

<div class="wrapper">

 <div class="card">
    <input type="checkbox" id="card3" class="more" />
    <div class="content">
      <div class="front">
        <div class="inner">
<span>
          <div>
          {connected ? (
            <button
              class="button"
              text-color="red"
              onClick={() => startMining()}
              disabled={loading}
            >
             {loading ? "Storing ID" : "Store ID permanently"  }
            </button>
          ) : (
            <CardanoWallet />
          )}
          {txHash && (
<div>
<center>


              <p>Success! Info to remember/write down:</p>
              <p><span>Violet ID: <b>{vch}.{rtc}</b></span></p>
              <p><span>Context: <b>{ext}</b></span></p>
              <p><span>Public ID: <b>{eid}</b></span></p>
              <p><span><b>{opt}</b></span></p>
              <p><span><b>*refresh browser to map additional IDs.</b></span></p>
            </center></div>
          )}

</div>
</span>

          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"><Image src="/g50.png" height="250" width="250" alt="" /></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <label for="card3" class="button" aria-hidden="true">
            BUILD OR CHANGE ID
          </label>
        </div>
      </div>
      <div class="back">
        <div class="inner">
          <div class="info">
            <span><Image src="/g50.png" height="250" width="250" alt="" /></span>
            <div class="icon">
              <i class="fas fa-users"></i>
              <span><i>CONFIDENTIAL</i></span>

          <div class="description">
           <label>&nbsp;</label>
           <label><p>Public context:&nbsp;&nbsp;<input  type="text" placeholder="myspace.com" value={ext} onChange={e => setExt(e.target.value)}/></p></label>
           <label><p>Public ID:&nbsp;&nbsp;<input  type="text" placeholder="Tom" value={eid} onChange={e => setEid(e.target.value)}/></p></label>
           <label><p>Violet handle:&nbsp;&nbsp;<input  type="text" placeholder="Tom" value={vch} onChange={e => setVch(e.target.value)}/></p></label>
           <label><p>Optional string:&nbsp;&nbsp;<input  type="text" placeholder="VerySecret123" value={opt} onChange={e => setOpt(e.target.value)}/></p></label>
           <label><p>Slotkey:&nbsp;&nbsp;<input  type="text" readOnly value={rtc} /></p></label>
           <label><p>&nbsp;</p></label>


          </div>
          <div class="location"><p></p></div>
          <div class="price"></div>
          <label for="card3" class="button return" aria-hidden="true">
            <i class="fas fa-arrow-left">Connect & Store</i>
    </label>  </div>
    </div>
  </div>
 </div>
</div>


</div>
</div>






</div>         )


};

