<!--
 * @Author: Mx
 * @Date: 2022-09-20 16:31:58
 * @Description: 
-->
<template>
  <view class="content">
    <h3 style="color:red;text-align: center;">1.按钮</h3>
    <view>
      <h3 style="color:red">1-1.size</h3>
      <k-button size="large" type="primary">large</k-button>
      <k-button type="primary">default</k-button>
      <k-button size="small" type="primary">small</k-button>

      <h3 style="color:red">1-2.disabled</h3>
      <k-button type="primary" disabled>主按钮 disabled</k-button>
      <k-button type="primary" plain disabled>次按钮 disabled</k-button>
      <k-button disabled>弱按钮 disabled</k-button>

      <h3 style="color:red">1-3.主按钮 次按钮 弱按钮</h3>
      <k-button type="primary">主按钮</k-button>
      <k-button type="primary" plain>次按钮 </k-button>
      <k-button>弱按钮</k-button>
      <h3 style="color:red">1-4.shape-square round</h3>
      <k-button type="primary" shape="round">round</k-button>
      <h3 style="color:red">1-5.block</h3>
      <k-button block type="primary">block</k-button>
      <h3 style="color:red">1-6.loading</h3>
      <k-button block type="primary" @click="confirm" :loading="loading">loading</k-button>
    </view>

    <h3 style="color:red">1-2.按钮组</h3>
    <k-button-group confirmText="确认核销" loadingText="核销中" cancelText="取消" @cancel="cancel" :loading="loading"
      @confirm="confirm">
    </k-button-group>

    <h3 style="color:red">2.overlay</h3>
    <k-button @click="showOverlay = true" type="primary">这里是overlay</k-button>

    <k-overlay :show="showOverlay" @click="showOverlay = false">
      <view class="warp">
        <view @tap.stop class="rect">这里是overlay</view>
      </view>
    </k-overlay>

    <h3 style="color:red">3.popup弹出层</h3>
    <k-button @click="showPopup = true">打开popup</k-button>
    <k-popup :show="showPopup" @click="showPopup = false" @close="showPopup = false" mode="bottom" round="30">
      <view class="center">
        <text>出淤泥而不染，濯清涟而不妖</text>
      </view>
    </k-popup>
    <h3 style="color:red">4.Dialog 对话框</h3>
    <k-button @click="showModal = true">打开dialog</k-button>

    <k-dialog :content="'下架后，该优惠券无法再被顾客领取，但不影响已领取顾客的使用'" :show="showModal" title="是否下架优惠券" :titleIcon="'icon-a-16_add'"
      :titleStyle="{ 'color': 'red', 'marginRight': '20rpx' }" @confirm="showModal = false">
    </k-dialog>

    <h3 style="color:red">5.输入框</h3>
    消费满<k-input border="bottom" inputAlign="center" maxlength="5" v-model="valueNumber"></k-input>元

    <k-list-cell>
      <view class="k-list__cell">
        <text style="flex:1">卡面值</text>
        <k-input border="none" inputAlign="center" :width="400" v-model="valueNumber" :placeholder="'请输入0～100,000'">
        </k-input>元
      </view>
    </k-list-cell>

    <h3 style="color:red">6.inputNumber</h3>
    <k-input-number v-model="valueNumber2"></k-input-number>

    <h3 style="color:red">7.textarea</h3>
    <k-textarea v-model="valueNumber3" maxlength="100" isCounter placeholder="请输入"></k-textarea>

    <h3 style="color:red">8.switch</h3>
    <k-label>
      <k-list-cell>
        <view class="k-list__cell">
          <text>是否添加员工企业微信1</text>
          <k-switch :checked="isChecked"></k-switch>
        </view>
      </k-list-cell>
      <k-list-cell>
        <view class="k-list__cell">
          <text>禁用1</text>
          <k-switch :checked="true" disabled></k-switch>
        </view>
      </k-list-cell>
      <k-list-cell>
        <view class="k-list__cell">
          <text>是否添加员工企业微信2</text>
          <k-switch :checked="false"></k-switch>
        </view>
      </k-list-cell>
      <k-list-cell>
        <view class="k-list__cell">
          <text>禁用2</text>
          <k-switch :checked="false" disabled></k-switch>
        </view>
      </k-list-cell>
    </k-label>

    <h3 style="color:red">9.radio</h3>
    <h3 style="color:red">默认</h3>
    <k-radio-group name="radio" v-model="valueNumber4" @change="changeRadio">
      <k-radio label="1">领券时添加好友</k-radio>
      <k-radio label="2">使用时添加好友</k-radio>
    </k-radio-group>
    <h3 style="color:red">水平使用</h3>
    <k-radio-group name="radio" v-model="valueNumber4" direction="horizontal" @change="changeRadio">
      <k-radio label="1">领券时添加好友</k-radio>
      <k-radio label="2">使用时添加好友</k-radio>
    </k-radio-group>


    <h3 style="color:red">外层添加list-cell</h3>
    <k-radio-group name="radio" v-model="valueNumber4" @change="changeRadio">
      <k-list-cell>
        <k-radio label="1">领券时添加好友</k-radio>
      </k-list-cell>
      <k-list-cell>
        <k-radio label="2">使用时添加好友</k-radio>
      </k-list-cell>
    </k-radio-group>

    <h3 style="color:red">横向两端排列形式(文本在左)</h3>
    <k-radio-group name="radio" v-model="valueNumber4" @change="changeRadio" text-position="left">
      <k-list-cell>
        <k-radio label="1">领券时添加好友</k-radio>
      </k-list-cell>
      <k-list-cell>
        <k-radio label="2">使用时添加好友</k-radio>
      </k-list-cell>
    </k-radio-group>


    <h3 style="color:red">10.checkbox</h3>
    <h3 style="color:red">默认</h3>
    <!-- <k-checkbox-group v-model="checkboxNumber">
      <k-checkbox :label="item.label" :disabled="item.disabled" v-for="(item, index) in checkboxItems">
        {{item.name}}
      </k-checkbox>
    </k-checkbox-group> -->

    <h3 style="color:red">横向两端排列形式(圆角在右侧)</h3>
    <k-checkbox-group>
      <k-list-cell v-for="(item, index) in checkboxItems">
        <k-checkbox :checked="item.checked" :value="item.value" :disabled="item.disabled" :name="item.name"
          iconPlacement="right">
        </k-checkbox>
      </k-list-cell>
    </k-checkbox-group>

    <!-- <k-checkbox-group>
      <view class="k-list__cell">
        <k-checkbox :checked="item.checked" :value="item.value" :disabled="item.disabled" :name="item.name"
          v-for="(item, index) in checkboxItems">
        </k-checkbox>
      </view>
    </k-checkbox-group> -->

    <h3 style="color:red">11.ActionSheet 上拉菜单 </h3>
    <k-button @click="showActionSheet1 = true">这里是ActionSheet1</k-button>

    <k-actionsheet :show="showActionSheet1" :tips="tips" :itemList="itemList" :isCancel="isCancel" @click="itemClick"
      @cancel="cancel"></k-actionsheet>

    <h3 style="color:red">12.ActionSheetRadio </h3>

    <k-button @click="actionSheetRadio = true" type="primary">这里是ActionSheetRadio</k-button>
    {{ actionSheetRadioValue }}
    <k-actionsheet-radio v-model="actionSheetRadioValue" :show="actionSheetRadio" :title="actionSheetRadioTitle"
      :radioItems="radioItems" @close="actionSheetRadio = false">
    </k-actionsheet-radio>

    <h3 style="color:red">13.SearchBar 搜索栏</h3>
    <k-search-bar placeholder="请输入关键字1">
      <template v-slot:leftin>
        <i class="iconfont icon-a-16_search"></i>
      </template>
    </k-search-bar>

    <k-search-bar placeholder="请输入关键字" v-model="valueNumber">
      <template v-slot:leftin>
        <i class="iconfont icon-a-16_search"></i>
      </template>
      <template v-slot:rightout>搜索</template>
    </k-search-bar>

    <h3 style="color:red">14.Empty 缺省页</h3>
    <k-empty></k-empty>

    <h3 style="color:red">15.Calendar 日历</h3>
    <!-- multiple range single-->
    <!-- maxDate -->
    <k-calendar v-model:show="showCalendar" :minDate="minDate" :maxDate="maxDate" modeType="range"
      @confirm="confirmCalendar" :defaultDate="chooseDate" closeOnClickOverlay>
    </k-calendar>
    <k-button @click="showCalendar = true">打开Calendar</k-button>
    <h3>选中日期:{{ chooseDate }}</h3>

    <h3 style="color:red">16.picker</h3>
    <k-picker :show="showPicker" :columns="columns" keyName="label" title="选择日期" @change="changePicker"
      @confirm="confirmPicker" @cancel="showPicker = false">
    </k-picker>
    {{ pickerValue }}
    <k-button @click="showPicker = true" type='primary'>打开picker</k-button>

    <h3 style="color:red">17.DatetimePicker 选择器</h3>
    <k-datetime-picker :show="showDatetimePicker" v-model="datatime" mode="date"
      @confirmDataPicker="confirmDatetimePicker" :minDate="minPickerDate" :maxDate="maxPickerDate" title="选择日期"
      @cancel="showDatetimePicker = false">
    </k-datetime-picker>
    毫秒值:{{ datatime }}
    日期: {{ datatime2 }}
    <k-button @click="showDatetimePicker = true" type='primary'>DatetimePicker</k-button>

    <h3 style="color:red">18.Tabs 标签</h3>
    <k-tabs :tabs="tabs" @change="changeTabs"></k-tabs>
  </view>
</template>

<script setup lang="ts">
import { timeFormat } from "@kmlet/shared"
import { ref } from 'vue'
// 1按钮
const loading = ref<Boolean>(false)
const disabled = ref<Boolean>(false)

const confirm = () => {
  loading.value = true
  // disabled.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

const cancel = () => {
  console.log("cancel", loading);
}

// 2 Overlay
const showOverlay = ref<Boolean>(false)

// 3 Popup
const showPopup = ref<Boolean>(false)

// 4 dialog
const showModal = ref<Boolean>(false)

// 5 input 
const valueNumber = ref<Number | String>('100')

// 6 inputNumber
const valueNumber2 = ref<Number>(1)

// 7 textarea
const valueNumber3 = ref<Number | String>("textarea")

// 8 switch
const isChecked = ref<Boolean>(true)

// 9 radio
const valueNumber4 = ref('1')
const changeRadio = (val: any) => {
  console.log("changeRadio", val, typeof (val));
}


// 10 checkbox
const checkboxNumber = ref('1')
const checkboxItems2 = [{
  name: '代金券',
  label: '1',
  disabled: false,
},
{
  name: '折扣券',
  label: '2',
  disabled: false,
},
{
  name: '兑换券',
  label: '3',
  disabled: true,
},
{
  name: '兑换券',
  label: '4',
  disabled: true,
}
]
const checkboxItems = [{
  name: '代金券',
  value: '1',
  checked: false,
  disabled: false,
},
{
  name: '折扣券',
  value: '2',
  checked: true,
  disabled: false,
},
{
  name: '兑换券',
  value: '3',
  checked: false,
  disabled: true,
},
{
  name: '兑换券',
  value: '4',
  checked: true,
  disabled: true,
}
]


// 11 actionsheet
const showActionSheet1 = ref(false)
const tips = ref('请选择性别')
const itemList = ['男', '女', '未知']
const isCancel = ref(false)
const itemClick = () => {
  showActionSheet1.value = false
}

// 12 actionSheetRadio
const actionSheetRadio = ref(false)
const actionSheetRadioValue = ref(2)
const actionSheetRadioTitle = ref("选卡类型")
const radioItems = ref([{
  name: '代金券',
  value: '1',
},
{
  name: '折扣券',
  value: '2',
},
{
  name: '兑换券',
  value: '3',
}
])


// 13 SearchBar

// 15 Calendar
const showCalendar = ref(false)
const minDate = new Date(2022, 7, 20).getTime()
// const maxDate = new Date(2023, 3, 30).getTime()
const maxDate = '2023-01-30'

const chooseDate = ref<Array<String>>([''])
const confirmCalendar = (dateArr: Array<string>) => {
  chooseDate.value = dateArr

}
// 16 Picker
const showPicker = ref<Boolean>(false)
const pickerValue = ref<String>("")
const columns = ref([
  [{
    label: '雪月夜',
    id: 2021
  }, {
    label: '冷夜雨',
    id: 804
  }]
]);
const changePicker = (val: String) => {
  console.log(val);
}
const confirmPicker = ({ value }) => {
  console.log(value);
  showPicker.value = false
  pickerValue.value = value
}

// 17 DatetimePicker
const showDatetimePicker = ref<Boolean>(false)
const datatime = ref(Number(new Date()))
const datatime2 = ref("")
const minPickerDate = new Date(2022, 8, 20).getTime()
const maxPickerDate = new Date(2023, 3, 10).getTime()

const resultTime = (time: any, mode: String) => {
  switch (mode) {
    case 'datetime':
      return timeFormat(time, 'yyyy-mm-dd hh:MM')
    case 'date':
      return timeFormat(time, 'yyyy-mm-dd')
    case 'year-month':
      return timeFormat(time, 'yyyy-mm')
    case 'time':
      return time
    default:
      return ''
  }
}

// 日期时间确定
const confirmDatetimePicker = (obj: { value: number, mode: string }) => {
  datatime.value = obj.value
  showDatetimePicker.value = false
  datatime2.value = resultTime(obj.value, obj.mode)
}


// 18 tabs
const tabs = ref(['优惠券', '核销记录'])
const changeTabs = (val) => {
  console.log(val);
}

</script>

<style>
.center {
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.k-list__cell {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
