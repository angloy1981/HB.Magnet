<template>
  <div class="components-container">
    <split-pane :min-percent='10' :default-percent='20'
      split="vertical"
      @resize="resize"
    >
      <template slot="paneL">
        <single-select-tree/>
        <div class="left-container"/>
      </template>
      <template slot="paneR">
        <fixed-header-table/>
        <div class="right-container" />
        <div class="dialog-right-container">
          <el-button
            size="small"
            type="primary"
            @click="appendTree"
          >
          {{ $t('catalog.add') }}
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="appendTree"
          >
          {{ $t('catalog.delete') }}
          </el-button>
        </div>
      </template>
    </split-pane>
    <el-dialog
      v-el-draggable-dialog
      :visible.sync="dialogTableVisible"
      :title="$t('catalog.catalogInfo')"
    >
      <el-form
        ref="catalogInfoForm"
        :model="catalogInfoForm"
        class="login-Form"
        autocomplete="on"
        label-position="left"
      >
        <el-form-item prop="id">
          <div>{{$t('catalog.id')}}</div>
          <div>
            <el-input
            ref="id"
            name="id"
            :key="1"
            size = "small"
            readonly="true"
            v-model="catalogInfoForm.id"
            :placeholder="$t('catalog.id')"/>
          </div>
        </el-form-item>
        <el-form-item prop="name">
          <div>{{$t('catalog.name')}}</div>
          <div>
            <el-input
            ref="name"
            name="name"
            :key="1"
            size = "small"
            v-model="catalogInfoForm.name"
            :placeholder="$t('catalog.name')"/>
          </div>
        </el-form-item>
        <el-form-item prop="type">
          <div>{{$t('catalog.type')}}</div>
          <div>
            <el-select v-model="catalogInfoForm.type" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item prop="sort">
          <div>{{$t('catalog.sort')}}</div>
          <div>
            <el-input
            ref="sort"
            name="sort"
            :key="1"
            size = "small"
            v-model="catalogInfoForm.sort"
            :placeholder="$t('catalog.sort')"/>
          </div>
        </el-form-item>
        <el-form-item>
        <div>
          <div>
            <el-checkbox v-model="catalogInfoForm.continueIncrease">
              {{ $t('catalog.continueIncrease') }}
            </el-checkbox>
          </div>
          <div class="dialog-right-container">
            <el-button
              size="small"
              type="primary"
              @click.native.prevent="handleConfirm"
            >
            {{ $t('permission.confirm') }}
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click.native.prevent="handleCancel"
            >
              {{ $t('permission.cancel') }}
            </el-button>
          </div>
        </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import SplitPane from 'vue-splitpane'
import { Component, Vue } from 'vue-property-decorator'
import SingleSelectTree, { SetTree, AppendTreeNode, GetTreeCurrentNodeKey } from '../tree/single-select-tree.vue'
import { Message, MessageBox } from 'element-ui'
import FixedHeaderTable from '../table/dynamic-table/components/FixedHeaderTable.vue'
import { CatalogModule } from '@/store/modules/catalog'

@Component({
  name: 'SplitPaneDemo',
  components: {
    SplitPane,
    SingleSelectTree,
    FixedHeaderTable
  }
})

export default class extends Vue {
  resize() {
    // Handle resize
    // SingleSelectTree
  }
  destroyed() {
    console.log("close")
  }
  mounted() {
    MessageBox("mounted")
    this.initalTree()
  }

  private dialogTableVisible = false

  private options= [{
    value: '1',
    label: 'Init'
  }, {
    value: '2',
    label: 'App'
  }, {
    value: '3',
    label: 'Query'
  }]

  private treeDatas = []

  private catalogInfoForm = {
    id: '',
    name: '',
    type: {
      id: 1,
      display: 'Init'
    },
    sort: 1,
    continueIncrease: false
  }

  private handleConfirm() {
    if(!this.catalogInfoForm.continueIncrease)
      this.dialogTableVisible=false
    
    let catalogInfo = {
      id: this.catalogInfoForm.id,
      name: this.catalogInfoForm.name,
      type: this.catalogInfoForm.type.id,
      sort: this.catalogInfoForm.sort
    }
    let typeid:number = this.catalogInfoForm.type.id
    console.log("this.catalogInfoForm.type:",typeid)
    console.log("catalogInfo:",catalogInfo)
    const treeDatas = CatalogModule.createCatalog(catalogInfo)
    AppendTreeNode( treeDatas )
    
    this.catalogInfoForm = {
      id: '',
      name: '',
      type: this.catalogInfoForm.type,
      sort: this.catalogInfoForm.sort + 1,
      continueIncrease: false
    }
  }

  private handleCancel() {
    this.dialogTableVisible = false
  }

  private appendTree() {
    this.dialogTableVisible = true
  }

  private initalTree() {
    let treeDatas = CatalogModule.InitialCatalog()
    SetTree(treeDatas)

    // treeDatas = CatalogModule.GetCatalogs()
    // AppendTreeNode( treeDatas )
  }
}
</script>

<style lang="scss" scoped>
.components-container {
  height: 100vh;
}

.left-container {
//   background-color: #F38181;
  height: 100%;
  width: 20%;
}

.right-container {
//   background-color: #FCE38A;
  height: 200px;
}

.top-container {
  background-color: #FCE38A;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95E1D3;
  height: 100%;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.dialog-right-container{
  position: absolute;
  right: 0px;
  margin-right: 10px;
  padding-bottom: 50px;
}
.dialog-left-container{
  float: left;
  margin-right: 10px;
  padding-bottom: 50px;
}
</style>
