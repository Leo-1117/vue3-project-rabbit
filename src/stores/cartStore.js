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
    return {
      cartList,
      addCart,
    };
  },
  {
    persist: true,
  }
);
