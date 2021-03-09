<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-2" style="margin-top:50px;">
                <div class="panel panel-default">
                    <div class="panel-heading"><h2>Score Generator</h2></div>

                    <div class="panel-body">
                        <div class="col-md-4">
                            <h4>Score (1-20):</h4>
                        </div>
                        <div class="col-md-2">
                            <h4><span class="label label-warning">{{ score }}</span></h4>
                        </div>
                        <button class="btn btn-success" @click="eventRandom()">GENERATE</button>
                    </div>
                </div>
            </div>
            <v-client-table :data="rows" :columns="columns" :options="options" >
                <template slot="number_of_times_generated" slot-scope="props" >
                    {{ props.row.counts }}(x)
                </template>
            </v-client-table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data: function () {
        return {
            score : 0,
            columns: ['score', 'number_of_times_generated', 'date', 'time'],
            rows:  [],
            options: {
                sortable: ['score', 'number_of_times_generated', 'date', 'time'],
                filterable: ['score', 'number_of_times_generated', 'date', 'time'],
            },
        }
    },
    created(){
        this.getList();
        this.$bus.$on('updateList', this.getList);
    },
    methods: {
        eventRandom: function() {
            this.score = Math.floor((Math.random() * 20) + 1)

            axios.get("/score/create", {
                    params: {
                        score: this.score,
                    }
                }).then(response => {
                this.$bus.$emit('updateList');
                return response
            })
            .catch(error => {
                console.log(error);
            });
        },
        getList: function() {
            axios.get("/score/list")
            .then(response => {
                this.rows = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        },
    }
}
</script>
