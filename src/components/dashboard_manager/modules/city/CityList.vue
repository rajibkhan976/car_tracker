<template>
  <v-container fluid fill-height class="align-start">
    <v-row class="fill-height">
      <v-col cols="3" fill-height>
        <menu-bar />
      </v-col>
      <v-col cols="9">
        <template>
          <v-data-table
            :headers="headers"
            :items="cities"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>List of cities</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-on:click="openAddItem()"
                >
                  New Item
                </v-btn>
                <v-dialog v-model="dialogAdd" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <vue-csv-import
                              v-model="parseCities"
                              :autoMatchFields="true"
                              :autoMatchIgnoreCase="true"
                              :map-fields="['id', 'name', 'region', 'country']"
                            ></vue-csv-import>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeAddItem">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="saveCities">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.id"
                              label="ID"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.name"
                              label="City name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.region"
                              label="Car"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.country"
                              label="Operator"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogAssign" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Assign Car</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="car"
                              :items="cars"
                              item-text="name"
                              item-value="id"
                              label="Cars"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="operator"
                              :items="operators"
                              item-text="name"
                              item-value="id"
                              label="Operators"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeAssign"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="assign"
                        >Assign</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="assignCar(item)">
                mdi-car
              </v-icon>
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
          </v-data-table>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MenuBar from "../../MenuBar.vue";
import { VueCsvImport } from "vue-csv-import";

export default {
  components: {
    MenuBar,
    VueCsvImport,
  },
  computed: {
    ...mapState({
      citiy_list: (state) => state.city.citiy_list,
      cars: (state) => state.city.car_list,
      operators: (state) => state.city.operator_list,
      assignedCars: (state) => state.city.assignedCars
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  data: () => ({
    dialogAssign: false,
    dialogAdd: false,
    dialog: false,
    dialogDelete: false,
    parseCities: [],
    headers: [
      {
        text: "City",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Region", value: "region" },
      { text: "Country", value: "country" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    cities: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: "",
      region: "",
      country: 0,
    },
    defaultItem: {
      id: 0,
      name: "",
      region: "",
      country: 0,
    },
    assignedCity: null,
    car: '',
    operator: ''
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions('city', [
        'addCities',
        'setIndex',
        'updateCity',
        'removeCity',
        'assignCar'
    ]),
    initialize() {
      this.cities = this.citiy_list;
    },
    openAddItem() {
      this.dialogAdd = true;
    },
    closeAddItem() {
      this.dialogAdd = false;
    },
    saveCities() {
      if (this.parseCities && this.parseCities.length !== 0) {
        this.parseCities.forEach((element, index) => {
          if (index !== 0) {
            this.$store.dispatch('city/addCities', element);
          }
        });
        console.log(this.parseCities);
        this.closeAddItem();
      }
    },
    editItem(item) {
      this.editedIndex = this.cities.indexOf(item);
      this.$store.dispatch('city/setIndex', this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.cities.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.$store.dispatch('city/removeCity', this.editedIndex);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        this.$store.dispatch('city/updateCity', this.editedItem);
      }
      this.close();
    },
    operatorCode() {
      var min = 100000;
      var max = 999999;
      var code = Math.floor(Math
                .random() * (max - min + 1)) + min;
      return code;
    },
    assignCar(item) {
      this.dialogAssign = true;
      this.assignedCity = item;
    },
    closeAssign() {
      this.dialogAssign = false;
    },
    assign() {
      if (this.car && this.operator && this.assignedCity) {
        var carAssigned = {
          city: this.assignedCity.id,
          car: this.car,
          operator: this.operator,
          operator_code: this.operatorCode()
        }
        this.$store.dispatch('city/assignCar', carAssigned);
      }
      this.closeAssign();
      console.log(this.assignedCars);
    }
  },
};
</script>