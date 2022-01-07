<template>
  <div id="navbar">
    <v-toolbar color="light-blue darken-4 opacity-">
      <v-app-bar-nav-icon
        color="white"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="d-flex justify-center">
        <v-img width="50" src="../assets/ruasdigital.png" />
        <h3 class="ma-1 white--text d-none d-sm-flex">RUAS DIGITAL LISENSI</h3>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute left temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-yellow--text text--accent-4"
        >
          <v-list-item class="yellow">
            <router-link to="/profile" style="text-decoration: none;">
              <v-list-item-content v-if="profile.name">
                <v-list-item-title class="text-h6">
                  {{ profile.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ profile.email }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content v-if="!profile.name">
                <v-list-item-title class="text-h6">
                  Menu
                </v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>

          <v-divider></v-divider>
          <div v-if="role != 'admin'">
            <router-link to="/" style="text-decoration: none;">
              <v-list-item>
                <v-icon>
                  mdi-home
                </v-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/user/product" style="text-decoration: none;">
              <v-list-item>
                <v-icon>
                  mdi-apps
                </v-icon>
                <v-list-item-title>Beli Produk</v-list-item-title>
              </v-list-item>
            </router-link>
            <div v-if="role != null">
              <router-link to="/user/licence" style="text-decoration: none;">
                <v-list-item>
                  <v-icon>
                    mdi-certificate
                  </v-icon>
                  <v-list-item-title>Lisensi Anda</v-list-item-title>
                </v-list-item>
              </router-link>
              <router-link to="/user/cart" style="text-decoration: none;">
                <v-list-item>
                  <v-icon>
                    mdi-cart
                  </v-icon>
                  <v-list-item-title>Keranjang Anda</v-list-item-title>
                </v-list-item>
              </router-link>
              <router-link to="/user/order" style="text-decoration: none;">
                <v-list-item>
                  <v-icon>
                    mdi-cart-plus
                  </v-icon>
                  <v-list-item-title>Pesanan Anda</v-list-item-title>
                </v-list-item>
              </router-link>
              <router-link to="/support" style="text-decoration: none;">
              <v-list-item>
                <v-icon>
                  mdi-help-box
                </v-icon>
                <v-list-item-title>Pusat Bantuan</v-list-item-title>
              </v-list-item>
            </router-link>
            </div>
          </div>
          <div v-if="role == 'admin'">
            <router-link to="/admin" style="text-decoration: none;">
              <v-list-item>
                <v-icon>
                  mdi-home
                </v-icon>
                <v-list-item-title>Dasboard</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/user" style="text-decoration: none;">
              <v-list-item>
                <v-icon>
                  mdi-account
                </v-icon>
                <v-list-item-title>Users</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/role" style="text-decoration: none;">
              <v-list-item>
                <v-icon>
                  mdi-key
                </v-icon>
                <v-list-item-title>Role</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/product" style="text-decoration: none;">
              <v-list-item>
                <v-icon>
                  mdi-apps
                </v-icon>
                <v-list-item-title>Produk</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/licence" style="text-decoration: none;">
              <v-list-item>
                <v-icon>
                  mdi-certificate
                </v-icon>
                <v-list-item-title>Lisensi</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/order" style="text-decoration: none;">
              <v-list-item>
                <v-icon>
                  mdi-cart
                </v-icon>
                <v-list-item-title>Pesanan</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/account" style="text-decoration: none;">
              <v-list-item>
                <v-icon>
                  mdi-bank
                </v-icon>
                <v-list-item-title>Rekening</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/confirm" style="text-decoration: none;">
              <v-list-item>
                <v-icon>
                  mdi-export
                </v-icon>
                <v-list-item-title>Konfirmasi pembayaran</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/channel" style="text-decoration: none;">
              <v-list-item>
                <v-icon>
                  mdi-cash-multiple
                </v-icon>
                <v-list-item-title>Metode pembayaran</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/api" style="text-decoration: none;">
              <v-list-item>
                <v-icon>
                  mdi-box
                </v-icon>
                <v-list-item-title>Api token</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/html" style="text-decoration: none;">
              <v-list-item>
                <v-icon>
                  mdi-web
                </v-icon>
                <v-list-item-title>HTML Code</v-list-item-title>
              </v-list-item>
            </router-link>
          </div>
          <v-list-item>
            <v-list-item-title>
              <v-btn v-if="login" @click="logout()" color="error" small>
                <v-icon>
                  mdi-logout
                </v-icon>
                logout
              </v-btn>
              <router-link to="/login" style="text-decoration: none;">
                <v-btn v-if="!login" color="info" small>
                  <v-icon>
                    mdi-login
                  </v-icon>
                  Login
                </v-btn>
              </router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: () => ({
    drawer: false,
    group: null,
    role: null,
    profile: {},
    login: false,
  }),
  computed: {},
  methods: {
    logout() {
      return this.$store.dispatch("logout");
    },
    async getProfile() {
      try {
        let response = await axios.get("/api/profile", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        if (response.status == 200) {
          this.login = true;
          this.profile = response.data.profile;
          this.role = response.data.profile.roles.map((role) => {
            return role.name;
          });
        }
      } catch (errors) {
        console.log(errors);
        this.login = false;
      }
    },
  },
  mounted() {
    this.getProfile();
  },
};
</script>
