<template>
    <div>
        <el-form
            autocomplete="on"
            label-position="left"
            >
            <el-form-item>
                <el-input
                    v-model="changedTenancyName"
                    :placeholder="'TenancyName'"
                    name="changedTenancyName"
                    tabindex="2"
                    autocomplete="on"
                    @blur="capsTooltip = false"
                />

                <div v-if="!changedTenancyName" style="margin-top:10px">{{'eaveEmptyToSwitchToHost'}}</div>
                <el-button @click="cancel">{{'Cancel'}}</el-button>
                <el-button @click="changeTenant" type="primary">{{'OK'}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { getTenantId, setTenantId, removeTenantId } from '@/utils/cookies'
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { TenantModule } from '@/store/modules/tenant'
import { isTenantAvailable } from '@/api/users'
import { Console } from 'node:console';
import { Form as ElForm, Input } from 'element-ui'

@Component
export default class TenantSwitch extends Vue{
    changedTenancyName:string='';
    get tenant(){
        return TenantModule;
    }
    cancel(){
        this.$emit('input',false);
    }
    visibleChange(value:boolean){
        if(!value){
            this.$emit('input',value);
        }else{
            this.changedTenancyName=this.$store.state.session.tenant?this.$store.state.session.tenant.name:''
        }
    }
    async changeTenant(){
        console.log({"tenancyName":this.changedTenancyName});
        if (!this.changedTenancyName) {
            location.reload();
            return;
        }else{
                let tenant = await isTenantAvailable({"tenancyName":this.changedTenancyName})
                console.log("state",tenant.data.result.state)
                switch(tenant.data.result.state){
                    case 1:
                        setTenantId(tenant.data.result.tenantId);
                        //location.reload();
                        return;
                    case 2:
                        break;
                    case 3:
                        break;
             }
        }
    }
}
</script>

