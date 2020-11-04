<template>
  <v-row>
    <v-col
      v-for="(unit, i) in units"
      :key="i"
      :cols="unit.flex"
    >
      <v-card
        outlined
        class='unitCard'
        @click='pushToUnit(unit.sys.id)'
      >

        <v-list-item >
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              {{ unit.fields.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ unit.fields.role}}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-text>{{ unit.fields.cost }}</v-list-item-text>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>

  // const unitResponse = await unitsIndex(this.$route.params.id);
  // this.units = unitResponse.items;
  // console.log(unitResponse.items);

</script>
