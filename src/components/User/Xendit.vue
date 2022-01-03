<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card class="overflow-hidden" v-if="data">
            <v-toolbar flat color="green lighten-2">
              <v-icon>mdi-card</v-icon>
              <v-toolbar-title class="font-weight-light">
                Tagihan untuk {{ data.user.name }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              {{ data.user.email }}
            </v-card-text>
            <v-divider></v-divider>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">
                    Item
                  </th>
                  <th class="text-left">
                    Sub-total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in data.suborder" :key="index">
                  <td v-if="data">
                    "<strong>{{ data.package.product.name }}"</strong>
                    {{ data.package.name }}
                  </td>
                  <td v-if="data">
                    <money-format
                      :value="data.total"
                      locale="id"
                      currency-code="IDR"
                    >
                    </money-format>
                  </td>
                </tr>
                <tr>
                  <td>Kode unik</td>
                  <td>{{ code }}</td>
                </tr>
                <tr class="yellow">
                  <td>TOTAL</td>
                  <td>
                    <money-format
                      :value="total"
                      locale="id"
                      currency-code="IDR"
                    >
                    </money-format>
                  </td>
                </tr>
                <tr>
                  <td>Bayar melalui</td>
                  <td>
                    {{ data.method }}
                  </td>
                </tr>
                <tr>
                  <td>Code pembayaran</td>
                  <td>
                    <strong v-if="invoice.payment_code">
                      {{ invoice.payment_code }}
                    </strong>
                    <strong v-if="invoice.account_number">
                      {{ invoice.account_number }}
                    </strong>
                    <a
                      v-if="invoice.actions"
                      :href="invoice.actions.desktop_web_checkout_url"
                      target="_blank"
                      >BAYAR DISINI</a
                    >
                  </td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
                    {{ invoice.status }}
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-divider></v-divider>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import MoneyFormat from "vue-money-format";

export default {
  components: {
    "money-format": MoneyFormat,
  },
  data() {
    return {
      data: {},
      invoice: {},
      total: {},
      code: {},
    };
  },
  computed: {},
  methods: {
    async getInvoice() {
      let form = {
        channel: this.data.method,
        id: this.data.paid_code,
      };
      try {
        let response = await axios.post("/api/xendit/invoice",form, {headers: { Authorization: "Bearer " + localStorage.getItem("token")}});
        if (response.status == 200) {
          this.invoice = response.data.xendit;
          console.log(this.invoice);
        }
      } catch (errors) {
        console.log(errors);
      }
    },
    async getOrder() {
      try {
        let response = await axios.get("/api/order/" + this.$route.params.id, {headers: { Authorization: "Bearer " + localStorage.getItem("token")}});
        if (response.status == 200) {
          this.data = response.data.order;
          let total = 0;
          this.data.suborder.forEach((e) => {
            total = total + e.total * e.amount;
          });
          this.code = this.data.total - total;
          this.total = this.data.total;
        }
      } catch (errors) {
        console.log(errors);
      }
    },
  },
  async mounted() {
    await this.getOrder();
    await this.getInvoice();
  },
};
</script>
