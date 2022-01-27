<template>
    <div>
        <el-table
            ref="filterTable"
            :data="table.tableData"
            style="width: 100%">
            <el-table-column
                v-for="(name, alias) in table.column" :key="name" :label="alias"
                :prop="name"
                sortable
                width="180"
                :column-key="name"
                :filters="[]"
                :filter-method="filterHandler"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  export default {
    data() {
      return {
          table: {
            colunm: [],
            tableData: [],
            filter:[
                {
                    name: "",
                    filterData: []
                }
            ]
                
          }
      }
    },
    methods: {
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      initialTableForm(form)
      {

      }
    }
  }
</script>