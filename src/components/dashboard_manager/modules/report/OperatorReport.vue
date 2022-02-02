<template>
    <v-container fluid fill-height class="align-start">
        <v-row class="fill-height">
            <v-col cols="3" fill-height>
                <menu-bar />
            </v-col>
            <v-col cols="9">
                <h6 class="text-h6 info--text mt-6 mb-6">Report</h6>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                    <v-select
                        v-model="operator"
                        :items="operator_report"
                        item-text="name"
                        item-value="id"
                        label="Operators"
                    ></v-select>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    >
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="date"
                            label="Picker in menu"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="date"
                        no-title
                        scrollable
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(date)"
                        >
                            OK
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
                    </v-col>
                </v-row>
                <v-btn
                    class="blue lighten-3"
                    text
                    @click="showReport()"
                >Show Report</v-btn>
                <v-row>
                <v-col cols="12">
                    <v-alert
                    :value="popUp"
                    >
                    <v-card>
                        <v-card-text>
                        <div class="text-h5 primary--text pt-2 pb-2">{{ report.name }} report</div>
                        <div class="text-h6 pt-2 pb-2">Hours worked: {{ report.hours_worked }}</div>
                        <div class="text-h6 pt-2 pb-2">Extra work: {{ report.extra_work }}</div>
                        <div class="text-h6 pt-2 pb-2">Wage: {{ report.wage }}</div>
                        <div class="text-h6 pt-2 pb-2">Extra wage: {{ report.extra_wage }}</div>
                        <div class="text-h6 pt-2 pb-2">Date: {{ report.date }}</div>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                        <v-btn
                            class="red lighten-3"
                            text
                            @click="popUp = false"
                        >Close</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-alert>
                </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from "vuex";
import MenuBar from "../../MenuBar";

export default {
  name: "OperatorReport",
  components: {
    MenuBar,
  },
  computed: {
    ...mapState({
      operator_report: (state) => state.user.operator_report
    })
  },
  data: () => ({
      operator: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
      menu: false,
      popUp: false,
      report: {}
  }),
  methods: {
      showReport() {
        if (this.operator_report && 
            this.operator && 
            this.date
        ) {
            this.operator_report.forEach((element) => {
                if (element.id === this.operator &&
                    element.date === this.date
                ) {
                    this.report = {
                        name: element.name,
                        hours_worked: element.hours_worked,
                        extra_work: element.extra_work,
                        wage: element.wage,
                        extra_wage: element.extra_wage,
                        date: element.date,
                    }
                    this.popUp = true;
                }
            });
        }
    }
  },
}
</script>