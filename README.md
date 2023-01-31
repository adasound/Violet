```diff
- A sound & self-sovereign identity is composable, fraud-resistant and context-dependent.
- A sound identity incorporates person, place and time.  
- A sound identity is opt-in.
```

<p align="center">

<img src="https://violet.sage3.org/_next/image?url=%2Fg50.png&w=640&q=75" width="100" height="100" />

```diff
https://violet.sage3.org
Twitter: @hi_violet_id
Mail: violet at sage3.org
Cardano POLICY ID: f0bc74744fd4d617e02950f47855b72c81c694a095e6d74e4e608b6e
```
<br>  
<hr>
<br>

# To build and run the webUI:

```diff
yarn install
yarn build 
yarn start
```

# Project outline:

Violet is a novel identity protocol.  Its storage layer is Cardano.  It will soon run on a publicly callable swarm network that is available for queries by any participating application, internet or otherwise, that requires high availability and the uncompromising security of Cardano's ledger.  Identity writes to the transactions layer (Cardano) are permissionless.  As nodes scale and participation increases, the high-availability query layer will be in the public domain and accessible to vendors for applications requiring identity verification / validation. 

Built with blakejs / <a href="https://github.com/MeshJS/mesh">meshjs</a> / nextjs+react / Cardano . 


# A primer on how it works (Violet User’s Manual Part I)


Person, place and time: building a Violet ID by example.  Violet enables the mapping of identities across the internet and in day-to-day contexts.
It’s enabled by the immutable storage of encrypted information on Cardano’s ledger. We highlight the straightforward hashing steps below. More will follow in the form of video explanations / practical use of the web UI and coming offline + ID swarm tools, but here’s the dirt on how an ID is composed using Violet. We welcome criticism and suggestions.


<br>
<br>
In this example, we are building a token that belongs to a Cardano wallet that points at a Twitter account - https://twitter.com/Hi_Violet_ID - while the Twitter account points back at the Cardano wallet.  <b> This is the crux of a Violet ID - bidirectional pointing between an identity wallet (on Cardano) and the context (in this case, Twitter).  This can be repeated for multiple contexts to create an identity mesh. </b>
<br>
<br>

Inputs for the ID:
1. Context: 'twitter.com'
2. Identity in context: '@Hi_Violet_ID'
3. A chosen handle (you can choose anything..): 'Violet'
4. The base58 of last three digits of the slot number at ID build time: 'GsH'
5. A salt (a string as long as you'd like) if this ID should only be verifiable privately. This ID is
very public (it's displayed on this Twitter profile for open verification) and so a salt/additional
string was not used.


Next we do some hashing:


Hashing the person-defined inputs:

  

variable1: Blake2bHex('twitter.com');

```diff
'29a2427950340ae203d7e2b502711d61cc4eab5626e1749448290992e269baea7810ce18b0901e60ff330f8eb763719f65416d5c20ad1462b1fcc07a958b5594'
```
  

variable2: Blake2bHex('@Hi_Violet_ID');

```diff
'e8fb445abb44ac58b5da52dfcdd56b1997619e26ab2bfa11eee1519adf79f333a145228784d7bc
5a80326c2cd88dde76ddbad5e57aa91993153e3bec202295a7'
```
  
  
var3. Blake2bHex('Violet');

```diff
'cbca2873de1207a03e9aae08fc12f12659dba7acd4bda043d618d95a6bc6c73eca0d49a530322
5839ee3935502c098d4c8ab4ed29f1e97c689c227d4d3a85796'
```
  
var4. Blake2bHex('GsH');

```diff
'f24e6d6ab695c090680ef505a49b56a8e84aeba44ad6017b3944888d1010a6829395a3789f2d2
c7c2e9c19549b443ebfda2062de87ddb857ecbe5dc565484fdf'
```
  
var5. Blake2bHex(''); (..as mentioned, no extra string for this one.  it's supposed to be publicly verifiable.)

```diff
'786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee58
5313896444934eb04b903a685b1448b755d56f701afe9be2ce'
```
  
Assembling the ID:

A final string to go on-chain is obtained. This string is 64 characters long so it fits into one
metadata field.
Assembly of the ID is blake2sHex(var1+var2+var3+'.'+var4+var5), so:

```diff
Blake2sHex('29a2427950340ae203d7e2b502711d61cc4eab5626e1749448290992e269baea78
10ce18b0901e60ff330f8eb763719f65416d5c20ad1462b1fcc07a958b5594e8fb445abb44ac58
b5da52dfcdd56b1997619e26ab2bfa11eee1519adf79f333a145228784d7bc5a80326c2cd88dde
76ddbad5e57aa91993153e3bec202295a7cbca2873de1207a03e9aae08fc12f12659dba7acd4b
da043d618d95a6bc6c73eca0d49a5303225839ee3935502c098d4c8ab4ed29f1e97c689c227d4
d3a85796.f24e6d6ab695c090680ef505a49b56a8e84aeba44ad6017b3944888d1010a6829395
a3789f2d2c7c2e9c19549b443ebfda2062de87ddb857ecbe5dc565484fdf786a02f742015903c6
c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b
903a685b1448b755d56f701afe9be2ce')
```
  
<b>Result: '0ed4e5497c01b9c5ba2ab6f5a5e9bab0beac2ba7baed050499112d88712b25b8.'</b>

<b>This ID can be viewed here:</b>


<a href = "https://cexplorer.io/tx/7cad983c6f64668945804486ed5b7add071be8165fce3f4d3410d0324295b545/metadata#data">
https://cexplorer.io/tx/7cad983c6f64668945804486ed5b7add071be8165fce3f4d3410d0324295b545/metadata#data
  </a>

<br>
<br>
<hr>

```
If this ID is displayed on this Twitter account, then the Twitter account (with a fixed handle) and
the on-chain identity are pointing at each other. We can now map more identities as we wish
across the internet and IRL. We can have separate wallets to hold similarly grouped social
contexts (or choose to keep everything separate in unrelated wallets), and we can determine the
spatial + temporal gating of context-dependent identities.

More to follow re. practical implementation and next steps for this project (Violet User Manual
Part II)..
```
https://violet.sage3.org





