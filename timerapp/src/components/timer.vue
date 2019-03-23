<template>
    <div class='wrapper'>
        <div class='timer'>
            <div>
                <h1 v-html='time'></h1>
                <label for="timername">Timer name</label>
                <input name='timername' type="text" v-model='currentName'>                
            </div>
            <div class='buttonboard'>
                <button @click='start'>start</button>   
                <i class="fas fa-ellipsis-v"></i>
                <button @click='reset'>reset</button>
                <i class="fas fa-ellipsis-v"></i>
                <button @click='pause'>pause</button>
                <i class="fas fa-ellipsis-v"></i>
                <button @click='resume'>resume</button>
            </div>
            
        </div>
        <div class='table'>
            <table>
                <thead>
                    <th>name</th>
                    <th>start time</th>
                    <th>end time</th>
                    <th>lapsed time</th>
                </thead>
                <tbody>
                    <tr v-for='record in savedTime' :key="record.lapsed">
                        <td><input type="text" v-model='record.name'></td>
                        <td>{{record.startTime.getHours() + ':' + record.startTime.getMinutes() + ':' + record.startTime.getSeconds()}}</td>
                        <td>{{record.endTime.getHours() + ':' + record.endTime.getMinutes() + ':' + record.endTime.getSeconds()}}</td>
                        <td>{{record.lapsed}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            state: "started",
            startTimeMiliseconds: Date.now(),
            startTime: Date.now(),
            currentTime: Date.now(),
            interval: null,
            savedTime: [],
            currentName: '',
        }
    },
    methods: {
        reset() {
            this.$data.startTime = Date.now();
            this.$data.currentTime = Date.now();
        },
        pause() {
            this.state = "paused";
            let now = new Date();
            this.savedTime.push({
                name: this.currentName,
                startTime: this.startTime,
                endTime: now,
                lapsed: this.time
            });
        },
        resume() {
            this.$data.state = "started";
        },
        updateCurrentTime() {
            if (this.$data.state == "started") {
                this.currentTime = Date.now();
            }
        },
        start() {
            this.$data.state = "started";
            this.startTime = new Date();
            this.interval = setInterval(this.updateCurrentTime, 10);
        }
    },
    // destroyed: function() {
    //     clearInterval(this.interval)
    // },
    computed: {
        time: function() {
            return this.hours + ':' + this.minutes + ':' + this.seconds + ':' + (this.displayMilliseconds ? this.displayMilliseconds : '00');
        },
        displayMilliseconds() {
            var lapsed = this.milliseconds;
            var mls = Math.floor(lapsed);
            return mls.toString().slice(-3,-1);
        },
        milliseconds: function() {
            return this.currentTime - this.startTimeMiliseconds;
        },
        hours: function() {
            var lapsed = this.milliseconds;
            var hrs = Math.floor((lapsed / 1000 / 60 / 60));
            return hrs >= 10 ? hrs : '0' + hrs;
        },
        minutes: function() {
            var lapsed = this.milliseconds;
            var min = Math.floor((lapsed / 1000 / 60) % 60);
            return min >= 10 ? min : '0' + min;
        },
        seconds: function() {
            var lapsed = this.milliseconds;
            var sec = Math.ceil((lapsed / 1000) % 60);
            return sec >= 10 ? sec : '0' + sec;
        }
    },    
}
</script>

<style>

.table table {
    width: 100%;
    margin-top: 1em;
}

button {
    background: white;
    border: none;
    padding: 0.7em 1.6em;
    font-size: 1.3em;
    outline-color: white;
}

.buttonboard {
    margin: 1.5em 0;
}

.table thead {
    padding: 1em;
    font-size: 1.2em;

}

.table {
    border-top: 2px solid gray;
    margin-left: auto;
    margin-right: auto;    
    width: 100%;
    max-width: 600px;    
}

input {
    padding: 1em;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
}

label {
    font-size: 1.2em;
}

tr td:first-child,
th:first-child {
    width: 245px;
}
</style>
