//封装购物车模块
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./userStore";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";
export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);
    //1.定义state-cartList
    const cartList = ref([]);
    //获取最新购物车列表action
    const updateNewList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };
    //2.action-addCart
    const addCart = async (goods) => {
      const { skuId, count } = goods;
      if (isLogin.value) {
        //登录后的购物车
        await insertCartAPI({ skuId, count });
        updateNewList();
      } else {
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
      }
    };

    //delete card
    const delCart = async (skuId) => {
      if (isLogin.value) {
        //调用接口实现接口购物车中的删除
        await delCartAPI([skuId]);
        updateNewList();
      } else {
        //思路1.找到删除项的下标值-splice
        //2.使用数组的过滤方法-filter
        const idx = cartList.value.findIndex((item) => skuId === item.skuId);
        cartList.value.splice(idx, 1);
      }
    };

    //clearCart
    const clearCart = () => {
      cartList.value = [];
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
    //3.number of selected
    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0)
    );
    //4.price of selected
    const selectedPrice = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0)
    );

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
      selectedCount,
      selectedPrice,
      clearCart,
    };
  },
  {
    persist: true,
  }
);
