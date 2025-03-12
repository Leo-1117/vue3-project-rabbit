//封装购物车模块
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    //1.定义state-cartList
    const cartList = ref([]);

    //2.action-addCart
    const addCart = (goods) => {
      //添加购物车操作
      //已添加,count+1(思路:通过匹配传递过来的商品对象中的skuId能在cartList中找到)
      //未添加-push
      const item = cartList.value.find((item) => goods.skuId === item.skuId);
      if (item) {
        //找到了
        item.count++;
      } else {
        //没找到
        cartList.value.push(goods);
      }
    };

    //delete card
    const delCart = (skuId) => {
      //思路1.找到删除项的下标值-splice
      //2.使用数组的过滤方法-filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId);
      cartList.value.splice(idx, 1);
    };

    //单选
    const singleCheck = (skuId, selected) => {
      //通过skuId,找到需要修改的一项
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    //allSelect
    const allCheck = (selected) => {
      //cartList中每一项的selected均设置为全选框的状态
      cartList.value.forEach((item) => (item.selected = selected));
    };

    //计算
    //1.总数量 count和
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0));
    //2.总价 count*price
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0));

    //if allSelect
    const isAll = computed(() => cartList.value.every((item) => item.selected));
    return {
      cartList,
      addCart,
      delCart,
      allCount,
      allPrice,
      singleCheck,
      isAll,
      allCheck,
    };
  },
  {
    persist: true,
  }
);
