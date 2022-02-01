<template>
  <v-container fluid fill-height class="align-start">
    <v-row class="fill-height">
      <v-col cols="3" fill-height>
        <nav-bar />
      </v-col>
      <v-col cols="9">
        <h1 class="headline mt-6 mb-6">Track my position</h1>
        <v-row>
          <v-col cols="12" sm="6">
            <v-alert
              :value="popUp"
            >
              <v-card>
                <v-card-text>
                  <div class="text-h5 pt-2 pb-2">Car details</div>
                  <div class="text-h6 pt-2 pb-2">City: {{ popupContent.city_id }}</div>
                  <div class="text-h6 pt-2 pb-2">Operator: {{ popupContent.operator_id }}</div>
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
        <div>
          <l-map
            :zoom.sync="zoom"
            :options="mapOptions"
            :center="center"
            :bounds="bounds"
            :min-zoom="minZoom"
            :max-zoom="maxZoom"
            style="height: 500px; width: 100%"
          >
            <l-control-layers
              :position="layersPosition"
              :collapsed="false"
              :sort-layers="true"
            />
            <l-tile-layer
              v-for="tileProvider in tileProviders"
              :key="tileProvider.name"
              :name="tileProvider.name"
              :visible="tileProvider.visible"
              :url="tileProvider.url"
              :attribution="tileProvider.attribution"
              :token="token"
              layer-type="base"
            />
            <l-control-zoom :position="zoomPosition" />
            <l-control-attribution
              :position="attributionPosition"
              :prefix="attributionPrefix"
            />
            <l-control-scale :imperial="imperial" />
            <l-marker
              v-for="car in cars"
              :key="car.id"
              :visible="car.visible"
              :draggable="car.draggable"
              :lat-lng.sync="car.position"
              :icon="icon"
              @click="alert(car)"
            >
              <l-tooltip :content="car.tooltip" class="pa-16" />
            </l-marker>
          </l-map>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "./NavBar";
import L from 'leaflet';
import Car from '../../assets/car.png';
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LControlZoom,
  LControlAttribution,
  LControlScale,
  LControlLayers,
} from "vue2-leaflet";
import { Icon } from "leaflet";
import { latLngBounds } from "leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const tileProviders = [
  {
    name: "OpenStreetMap",
    visible: true,
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  {
    name: "OpenTopoMap",
    visible: false,
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  },
];

export default {
  name: "TrackCars",
  components: {
    NavBar,
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LControlZoom,
    LControlAttribution,
    LControlScale,
    LControlLayers,
  },
  computed: {
    ...mapState({
      cars: (state) => state.user.operators,
    }),
  },
  data() {
    return {
      center: [35.6804, 139.7690],
      opacity: 0.7,
      token: "your token if using mapbox",
      mapOptions: {
        zoomControl: false,
        attributionControl: false,
        zoomSnap: true,
      },
      zoom: 3,
      minZoom: 1,
      maxZoom: 20,
      zoomPosition: "topleft",
      attributionPosition: "bottomright",
      layersPosition: "topright",
      attributionPrefix: "Vue2Leaflet",
      imperial: false,
      tileProviders: tileProviders,
      bounds: latLngBounds(
        { lat: 24.14, lng: 123.47 },
        { lat: 45.28, lng: 145.35 }
      ),
      icon: L.icon({
        iconUrl: Car,
        iconSize: [10, 10]
      }),
      popUp: false,
      popupContent: ''
    };
  },
  methods: {
    alert(item) {
      this.popupContent = item;
      this.popUp = true;
    },
  },
};
</script>