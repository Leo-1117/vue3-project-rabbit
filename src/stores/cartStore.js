//封装购物车模块
import { defineStore } from "pinia";
import { ref } from "vue";

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
    return {
      cartList,
      addCart,
      delCart,
    };
  },
  {
    persist: true,
  }
);
