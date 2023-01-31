import Head from "next/head";
import { useState, useEffect } from "react";
import * as SimpleBase from 'simple-base';

const blakejs = require('blakejs');


export default function Home() {



  const [ext, setExt] = useState('');
  const [eid, setEid] = useState('');
  const [vch, setVch] = useState('');
  const [opt, setOpt] = useState('');
  const [rtc, setRtc] = useState('');
/*  const [rtc, setRtc] = useState(''); */
  const [calculatedValue, setCalculatedValue] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');



/*  const x = resolveSlotNo('preprod'); */


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(calculatedValue);
  };

  const depGroup = ext+eid+vch+'.'+rtc+opt


/*  useEffect(() => {
    setCalculatedValue(calculateValue(depGroup));
  }, [depGroup]); */



  const calculateValue = (input) => {


    const extp = blakejs.blake2bHex(ext);
    const eidp=blakejs.blake2bHex(eid);
    const vchp=blakejs.blake2bHex(vch);
    const rtcp = blakejs.blake2bHex(rtc);
    const optp=blakejs.blake2bHex(opt);


    return  (blakejs.blake2sHex(extp+eidp+vchp+'.'+rtcp+optp));


  }



   useEffect(() => {
    setCalculatedValue(calculateValue(depGroup));
  }, [depGroup]);



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

  return (

<div>

<div class="wrapper">

 <div class="card">
    <input type="checkbox" id="card3" class="more" />
    <div class="content">
      <div class="front">
        <div class="inner">
<span>
Violet Verify ID
</span>

          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <label for="card3" class="button" aria-hidden="true">
           GO VERIFY
          </label>
        </div>
      </div>
      <div class="back">
        <div class="inner">
          <div class="info">
            <span></span>
            <div class="icon">
              <i class="fas fa-users"></i>
              <span><i>PLEASE FILL IN THE RELEVANT FIELDS:</i></span>

          <div class="description">
           <label>&nbsp;</label>
           <label><p>Public context:&nbsp;&nbsp;<input  type="text" placeholder="myspace.com" value={ext} onChange={e => setExt(e.target.value)}/></p></label>
           <label><p>Public ID:&nbsp;&nbsp;<input  type="text" placeholder="Tom" value={eid} onChange={e => setEid(e.target.value)}/></p></label>
           <label><p>Violet handle:&nbsp;&nbsp;<input  type="text" placeholder="Tom" value={vch} onChange={e => setVch(e.target.value)}/></p></label>
           <label><p>Optional string:&nbsp;&nbsp;<input  type="text" placeholder="VerySecret123" value={opt} onChange={e => setOpt(e.target.value)}/></p></label>
           <label><p>Slotkey:&nbsp;&nbsp;<input  type="text"   value={rtc} onChange={e => setRtc(e.target.value)}    /></p></label>
           <label><p>&nbsp;</p></label>
           <label><p>Violet: {calculatedValue}</p></label>

          </div>
          <div class="location"><p></p></div>
          <div class="price"></div>
          <label for="card3" class="button return" aria-hidden="true">
            <i class="fas fa-arrow-left"></i>
          </label>
        </div>
      </div>
    </div>
  </div>
 </div>



</div>
</div>






</div>         )


};

