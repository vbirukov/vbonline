<template>
    <div class='wrapper'>
        <h3>Top 15 cryptocurrencies by market capitalization</h3>
        <table class='assets-table'>
            <thead>
                <tr>
                    <th class='assets-table__name'>Name</th>
                    <th class='assets-table__price'>Price</th>
                    <th class='assets-table__marketCap'>market Cap</th>
                    <th class='assets-table__volume'>volume 24Hr</th>
                </tr>
            </thead>
            <div class='assets-table__scrollbox'>
                <tbody>
                    <tr v-for='asset in display' :key='asset.id'>
                        <td class='assets-table__name'>{{asset.id}}</td>
                        <td class='assets-table__price'>${{displayPrice(Math.round(asset.priceUsd * 100) / 100)}}</td>
                        <td class='assets-table__marketCap'>${{displayValues(Math.round(asset.marketCapUsd))}}</td>
                        <td class='assets-table__volume'>${{Math.round(asset.volumeUsd24Hr)}}</td>
                    </tr>
                </tbody>
            </div>
            
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        assets: [],
        errors: [],
        display: [],
        assetsRequestOffset: 0,
    }),
    methods: {
        getAssets() {
            axios.get('https://api.coincap.io/v2/assets?limit=2000&offset=' + this.assetsRequestOffset, {
                timeout: 5000,
            })
            .then(response => {
                this.assets = response.data;
                if (response.data.length >= 2000) {
                    this.assetsRequestOffset += 2000;
                    this.getAssets()
                } else {
                    this.proceedData();
                }
            })
            .catch(e => {
                this.errors.push(e)
            })            
        },
        initWebSockets(display) {
            let url = 'wss://ws.coincap.io/prices?assets='
            this.display.forEach(element => {
                url += element.id + ','
            });
            url = url.slice(0, -1);

            const socket = new WebSocket(url);

            socket.addEventListener('open', function (event) {
                socket.send('Hello Server!');
            });

            socket.onmessage = function (msg) {
                let data = JSON.parse(msg.data);
                for (var key in data) {
                    for (var asset in display) {
                        if (display[asset].id == key) {
                            console.log(msg);
                            display[asset].priceUsd = data[key];
                        }
                    }
                }
            }        

        },
        proceedData() {
            this.assets.data.sort((a, b) => {a.marketCapUsd - b.marketCapUsd});
            this.display = this.assets.data.slice(0, 15);
            this.initWebSockets(this.display);
        },
        displayPrice(price) {
            let stringPrice = price.toString();
            if (stringPrice.length <= 6) {
                return stringPrice
            }
            if (stringPrice.length > 6 && stringPrice.length < 10) {
                stringPrice = stringPrice.slice(0,-6) + ',' + stringPrice.slice(-6);
                return stringPrice
            }
        },
        displayValues(price) {
            let stringPrice = price.toString();             
            if (stringPrice.length > 3 && stringPrice.length <= 6) {
                stringPrice = stringPrice.slice(0,-3) + stringPrice.slice(-3,-1) + 'k';
                return stringPrice
            } else if (stringPrice.length > 6 && stringPrice.length <= 9) {
                stringPrice = stringPrice.slice(0,-6) + ',' + stringPrice.slice(-6,-4) + 'm';
                return stringPrice
            } else if (stringPrice.length > 9 && stringPrice.length < 12) {
                stringPrice = stringPrice.slice(0,-9) + ',' + stringPrice.slice(-9,-7) + 'b';
                return stringPrice
            }
        }
    },
    created() {
        this.assetsRequestOffset = 0;
        this.getAssets();
        this.display
    },
}


</script>

<style>
.assets-table {
    font-size: 1.2em;
    width: 100%;
    max-width: 1000px;
    background: #fff;
    margin: 1em 0;
    border: 1px solid rgba(34,36,38,.15);
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: .28571429rem;
    text-align: left;
    color: rgba(0,0,0,.87);
    border-collapse: separate;
    border-spacing: 0;
    margin-left: auto;
    margin-right: auto;
}

.assets-table td, .assets-table th {
    padding: 1em;
    border-bottom: 1px solid rgba(34,36,38,.1);
}

.assets-table tr:hover {
    background-color: rgba(0,0,0,.05);
}

table {
    width: 100%;
}

tbody {
    display: block;
}

tr { 
    display: flex;
}

thead th, tbody td  {
    text-align: left;
    width: 25%;
}

@media screen and (max-width: 460px) {
    .assets-table__marketCap, .assets-table__volume {
        display: none;
    }
        thead th, tbody td  {
        width: 50%;
    }
}

/* width */
::-webkit-scrollbar {
    width: 10px;
}

.assets-table__scrollbox {
    max-height: 80vh;
    overflow-y: scroll;
    visibility: hidden;
    transition: visibility ease-in-out 0.3s;
}


.assets-table:hover .assets-table__scrollbox,
.assets-table tbody,
.assets-table__scrollbox:hover,
.assets-table__scrollbox:focus {
    visibility: visible;
}


/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(121, 151, 168); 
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(155, 193, 250); 
  border-radius: 10px;
}
</style>

