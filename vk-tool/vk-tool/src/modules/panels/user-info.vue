<template>
    <v-layout>
        <v-avatar
          :tile='true'
          :size='150'
          color="grey lighten-4"
        >
          <img :src='user.avatarSrc' alt="avatar">
        </v-avatar>        
        <v-flex class='avatar-container'>
            <img :src='user.avatarSrc' alt="">
        </v-flex>
        <v-flex class="info-container">
            <h2>{{user.name}}</h2>
            <div class='flex-col'>
                <div class='flex-col'>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
import { eventBus } from '../../main.js';

export default {
  props: ['user'],
  data() {
      return {
          completedWidth: 0,
          analyzed: 'test',
          viewErrored: false,
          errorFriends: [],
          max: 0,
      }
  },
  created() {

  },
  methods: {
      friendGroups() {
        console.log('reseting previous results');
        this.user.friendList = [];
        this.user.friendsGroups = {};
        this.user.errorFriends = [];
        console.log('reset done');
        console.log('requesting friends list');
        let getUsersRecords = new Promise((resolve, reject) => {

            VK.Api.call('friends.get', {user_id: this.user.uid, v: '5.73'}, function(r, e) {
                if (r.error) {
                    console.log('error detected: ' + JSON.stringify(r.error));
                    this.analyzed = 'error, see console for details and try once more';
                    reject('error: ' + JSON.stringify(r.error));
                }
                console.log('dumping record');
                this.user.friendList = r.response.items;
                resolve();
                // for testing purposes only
                console.log('splicing friends list');
                // this.user.friendList.splice(360, 1200);
                // console.log('done, friends list now: ' + this.user.friendList.length + ' records long');

            }.bind(this));

        });
        getUsersRecords.then(resolve => this.processFriedsList()).then(resolve => this.filterFriendsGroups());
        // this.processFriedsList();
        // this.filterFriendsGroups();
      },
      processFriedsList() {
            let lastindex = 0;
            // test end
            this.user.friendList.reduce(function(previousValue, currentValue, index, array){
                let delay = index; 
                setTimeout(() => {
                    this.analyzed = 'processing record #' + index;
                    this.completedWidth = index / ( array.length / 100 );  
                    if (index == array.length) {
                        this.completedWidth = 100;
                        console.log('index: ' + index);
                        console.log('array.length: ' + array.length);
                    }      
                    VK.Api.call('groups.get', {user_id: currentValue, v: '5.73'}, function(r) 
                    {
                        if (r.response) {
                            r.response.items.forEach(function(item) {
                                this.user.friendsGroups[item] ? this.user.friendsGroups[item] += 1 : this.user.friendsGroups[item] = 1;    
                            }.bind(this));
                        } else if (r.error) {
                            console.log('an error ocurred, with getting friends info');
                            console.log('friend id: ' + currentValue);
                            console.log('error text: ' + JSON.stringify(r.error));
                            if (r.error.error_code == 18) {
                                this.user.errorFriends.push(currentValue);
                            }
                        }
                    }.bind(this))
                }, delay * 700);   
                lastindex = index;                   
            }.bind(this));
            console.log('last processed index: ' + lastindex); 
        console.log('request & processing coplete. ' + JSON.stringify(this.user.friendsGroups));                     
      },
      filterFriendsGroups() {
        this.user.friendsGroups = {"1":7,"2":2,"5":2,"11":8,"14":1,"15":2,"16":5,"18":2,"21":7,"22":2,"24":2,"25":2,"27":2,"28":38,"30":2,"33":7,"37":2,"39":4,"40":2,"41":2,"47":2,"52":2,"53":4,"55":2,"57":14,"59":4,"62":2,"64":2,"65":12,"75":2,"79":6,"80":2,"86":2,"88":4,"90":2,"91":2,"94":4,"100":2,"104":4,"113":4,"123":2,"125":2,"131":2,"136":2,"139":2,"141":2,"154":24,"158":2,"162":10,"163":2,"168":2,"175":2,"176":2,"177":2,"188":4,"206":4,"208":4,"210":2,"215":2,"218":2,"219":2,"223":5,"226":1,"235":2,"243":2,"248":2,"251":8,"267":2,"272":14,"275":5,"277":2,"296":2,"301":2,"306":2,"320":2,"325":4,"326":4,"337":16,"338":2,"340":6,"357":2,"365":4,"367":2,"376":6,"380":2,"383":7,"395":2,"396":4,"403":2,"404":10,"406":2,"411":2,"431":2,"439":115,"442":15,"443":2,"454":2,"457":10,"459":2,"465":1,"468":2,"469":8,"474":2,"476":2,"480":2,"486":16,"491":24,"493":2,"498":2,"499":2,"502":2,"503":4,"505":2,"509":10,"510":2,"516":4,"521":2,"527":2,"530":4,"533":4,"536":10,"541":4,"547":2,"566":4,"571":2,"578":2,"599":10,"601":2,"613":19,"615":1,"617":8,"624":18,"627":4,"628":2,"633":2,"639":2,"647":2,"649":2,"652":6,"654":6,"658":11,"664":4,"676":2,"683":6,"700":4,"708":10,"711":2,"712":12,"714":13,"717":2,"725":2,"726":7,"729":1,"731":10,"734":1,"735":6,"736":4,"739":1,"759":2,"762":6,"764":4,"765":2,"778":4,"784":2,"796":4,"798":2,"801":2,"806":4,"807":4,"817":4,"818":2,"826":18,"837":4,"839":2,"851":4,"857":2,"864":2,"870":2,"871":2,"891":2,"902":2,"920":2,"940":6,"950":2,"962":2,"965":8,"967":6,"968":2,"972":2,"974":4,"983":24,"993":2,"1005":2,"1023":4,"1025":2,"1028":4,"1034":2,"1061":2,"1071":3,"1072":2,"1079":2,"1104":2,"1109":2,"1118":24,"1126":2,"1132":2,"1154":2,"1174":10,"1176":2,"1179":2,"1183":2,"1190":2,"1198":2,"1208":1,"1222":2,"1234":2,"1244":4,"1245":8,"1247":2,"1273":2,"1293":2,"1306":6,"1307":2,"1310":4,"1317":6,"1326":2,"1334":2,"1355":8,"1358":19,"1383":2,"1424":2,"1442":2,"1447":5,"1462":2,"1463":2,"1469":2,"1477":2,"1478":2,"1485":24,"1495":2,"1499":2,"1523":2,"1526":2,"1538":10,"1541":2,"1552":4,"1557":4,"1568":8,"1588":5,"1589":4,"1607":4,"1622":12,"1634":4,"1664":2,"1665":4,"1668":2,"1670":2,"1680":1,"1709":2,"1717":4,"1722":2,"1733":4,"1735":2,"1739":2,"1744":2,"1755":6,"1756":4,"1759":2,"1766":4,"1767":6,"1769":2,"1777":6,"1784":2,"1790":2,"1799":4,"1820":2,"1821":12,"1826":2,"1829":4,"1830":2,"1843":4,"1849":2,"1863":3,"1874":8,"1878":2,"1879":2,"1880":2,"1889":22,"1893":4,"1914":2,"1917":2,"1918":1,"1928":2,"1955":4,"1959":22,"1962":2,"1967":2,"1976":2,"1980":63,"2001":4,"2002":11,"2006":1,"2007":4,"2008":2,"2028":3,"2033":2,"2043":3,"2044":2,"2056":2,"2060":2,"2087":2,"2094":2,"2104":2,"2112":20,"2116":6,"2127":3,"2133":4,"2150":2,"2172":1,"2207":2,"2248":6,"2249":4,"2251":3,"2253":4,"2264":2,"2266":6,"2290":2,"2296":6,"2318":4,"2324":2,"2334":2,"2354":2,"2367":2,"2370":2,"2373":2,"2380":2,"2397":2,"2408":8,"2411":2,"2422":2,"2425":2,"2432":20,"2433":2,"2451":2,"2457":4,"2473":4,"2477":2,"2484":11,"2497":8,"2503":2,"2507":2,"2559":2,"2565":4,"2569":4,"2571":1,"2572":4,"2582":2,"2597":4,"2600":2,"2611":14,"2617":2,"2618":8,"2629":4,"2675":4,"2688":12,"2692":2,"2704":2,"2709":10,"2710":8,"2742":6,"2749":2,"2758":3,"2776":2,"2780":2,"2794":2,"2799":2,"2803":4,"2804":6,"2805":6,"2806":4,"2826":2,"2843":2,"2849":2,"2878":6,"2887":2,"2889":2,"2904":7,"2935":4,"2938":2,"2939":2,"2942":2,"2974":95,"2977":2,"2991":2,"2992":10,"2995":4,"3023":2,"3028":2,"3032":2,"3035":2,"3084":2,"3096":2,"3115":2,"3132":2,"3144":2,"3146":4,"3150":6,"3154":2,"3155":2,"3183":2,"3191":2,"3204":2,"3225":2,"3243":2,"3249":2,"3252":19,"3267":2,"3278":2,"3285":4,"3305":14,"3336":2,"3346":2,"3351":2,"3357":2,"3403":6,"3426":2,"3442":7,"3459":10,"3482":2,"3489":2,"3500":4,"3529":2,"3537":2,"3549":4,"3567":2,"3602":2,"3603":2,"3604":2,"3622":4,"3632":4,"3653":2,"3678":2,"3692":2,"3733":2,"3750":4,"3776":2,"3785":20,"3788":2,"3800":2,"3806":2,"3808":2,"3818":8,"3839":2,"3840":2,"3918":2,"3938":8,"3950":2,"3971":2,"3987":2,"4009":2,"4042":4,"4049":2,"4050":2,"4051":6,"4055":1,"4059":8,"4081":1,"4085":2,"4086":2,"4097":6,"4111":2,"4137":7,"4144":2,"4172":4,"4176":2,"4183":4,"4194":2,"4203":2,"4206":4,"4214":2,"4244":2,"4247":2,"4308":1,"4329":2,"4337":4,"4354":2,"4357":2,"4362":2,"4363":4,"4369":4,"4391":8,"4393":2,"4397":2,"4404":2,"4423":10,"4439":6,"4485":2,"4569":67,"4574":2,"4581":1,"4599":2,"4610":2,"4613":2,"4630":2,"4648":2,"4653":2,"4687":2,"4707":2,"4719":8,"4743":1,"4755":4,"4773":2,"4829":21,"4844":2,"4847":2,"4862":2,"4916":6,"4935":2,"4938":2,"4939":2,"4943":4,"4974":8,"4976":2,"4992":8,"5037":2,"5053":2,"5074":8,"5082":2,"5114":2,"5116":2,"5132":2,"5150":2,"5175":2,"5176":2,"5192":2,"5195":2,"5225":2,"5229":2,"5237":4,"5240":2,"5241":2,"5299":4,"5308":8,"5310":4,"5315":2,"5322":6,"5344":6,"5349":2,"5366":6,"5390":15,"5396":2,"5427":2,"5433":2,"5453":2,"5456":2,"5463":2,"5464":2,"5512":4,"5533":2,"5550":4,"5555":2,"5599":4,"5614":2,"5647":2,"5668":2,"5683":2,"5722":4,"5726":4,"5733":8,"5741":4,"5747":2,"5757":6,"5768":2,"5811":6,"5831":2 }
        console.log('getting ready to parse these records: ' + JSON.stringify(this.user.friendsGroups));
        this.analyzed = [];
        this.analyzed.idList = [];
        for (let group in this.user.friendsGroups) {
            console.log('group: ' + this.user.friendsGroups[group]);
            console.log('max: ' + this.max);
            if (this.user.friendsGroups[group] > this.max) {
                let newRecord = {
                    id: group,
                    match: this.user.friendsGroups[group],
                }
                this.analyzed.idList.push(group);
                this.analyzed.push(newRecord);
            }   
        }
        eventBus
        console.log('analyzed: ' + JSON.stringify(this.analyzed));
        let callProps = {};
        callProps.method = 'groups.getById';
        callProps.options = {
            group_ids: this.analyzed.idList,
        };
        callProps.name = 'Groups';
        callProps.callback = function(r) {
            if (r.response) {
                console.log('respose received: ' + JSON.stringify(r.response));
                r.response.type = apiMethod.name;
                eventBus.$emit('dataReceived', r.response);
            } else if (r.error) {
                console.log('an error ocurred, with getting list of groups');
                console.log('error text: ' + JSON.stringify(r.error));
            }
        };
        eventBus.$emit('callVk', callProps);
        console.log('event Emitted');
      },
      logFriendsGroups() {
          console.log(JSON.stringify(this.user.friendsGroups));
      },
      viewErrorFriends() {
          console.log('view errored: ' + this.viewErrored);
          this.viewErrored = true;
      },
  }
}
</script>

<style scoped>
    .main-container {
        max-width: 1150px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    h2 {
        margin-top: 0;
    }

    img {
        border-radius: 50%;
        width: 80px;
        height: 80px;
        object-fit: cover;
    }

    .info-container {
        display: flex;
        flex-direction: column;
    }

    .info-container div {
        display: flex;
    }
    
    .flex-col {
        flex-direction: column;
    }

    .flex-row {
        flex-direction: row;
    }

    input {
        max-width: 25px;
        margin-left: 1rem;
    }
</style>
